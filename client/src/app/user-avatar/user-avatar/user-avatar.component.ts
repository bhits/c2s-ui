import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CropperSettings, ImageCropperComponent} from "ng2-image-cropper";
import {FileValidator} from "../../shared/file-validator.directive";
import {UserAvatarService} from "../shared/user-avatar.service";
import {NotificationService} from "../../core/notification.service";
import {Router} from "@angular/router";
import {UserAvatarMonitoringService} from "../../shared/user-avatar-monitoring.service";
import {AvatarImage} from "../shared/avatar-image.model";
import {isNullOrUndefined} from "util";

const CROPPED_IMAGE_WIDTH: number = 48;  // Width of cropped avatar image in pixels
const CROPPED_IMAGE_HEIGHT: number = 48;  // Height of cropped avatar image in pixels

const CANVAS_WIDTH: number = 460;  // Width of canvas in pixels
const CANVAS_HEIGHT: number = 460;  // Height of canvas in pixels

const CROPPING_CANVAS_CLASS: string = "cropping-canvas";
const CLASS_WHEN_IMAGE_FILE_SELECTED: string = "ready-to-crop";

@Component({
  selector: 'c2s-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  private fileName: string;

  uploadImageForm: FormGroup;

  data: any;
  cropperSettings: CropperSettings;
  isCurrentAvatarDefault: boolean;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  // A direct reference to the HTML form element as a ViewChild is necessary to properly reset file type input element (see resetUploadForm method below for details)
  @ViewChild('uploadForm') uploadForm: ElementRef;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userAvatarService: UserAvatarService,
              private notificationService: NotificationService,
              private userAvatarMonitoringService: UserAvatarMonitoringService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = CROPPED_IMAGE_WIDTH;
    this.cropperSettings.croppedHeight = CROPPED_IMAGE_HEIGHT;
    this.cropperSettings.canvasWidth = CANVAS_WIDTH;
    this.cropperSettings.canvasHeight = CANVAS_HEIGHT;
    this.cropperSettings.cropperClass = CROPPING_CANVAS_CLASS;
    this.cropperSettings.croppingClass = CLASS_WHEN_IMAGE_FILE_SELECTED;
    this.cropperSettings.noFileInput = true;
    this.data = {};
    this.fileName = null;
    this.isCurrentAvatarDefault = null;

    this.userAvatarMonitoringService.userAvatarSource
      .subscribe(
        (currentAvatar: AvatarImage) => {
          if (!isNullOrUndefined(currentAvatar)) {
            this.isCurrentAvatarDefault = currentAvatar.fileContents === null;
          } else {
            this.isCurrentAvatarDefault = null;
          }
        },
        () => {
          this.isCurrentAvatarDefault = null;
        });
  }

  ngOnInit(): void {
    this.uploadImageForm = this.initUploadImageFormGroup();
  }

  submitCroppedImage() {
    if ((this.data.hasOwnProperty('image')) && (this.data.image != null)) {    // The not-equals operator was deliberately used here instead of the strict not-equals to match both 'null' & 'undefined'
      if ((this.fileName !== null) && (this.fileName.length > 0)) {
        this.extractCroppedImageAsFile(this.data.image, this.fileName)
          .then(file => {
            this.userAvatarService.saveUserAvatar(UserAvatarService.buildAvatarFileUploadRequest(this.data.image, file))
              .subscribe(
                (newAvatar: AvatarImage) => {
                  this.userAvatarMonitoringService.changeUserAvatar(newAvatar);
                  this.cropper.reset();
                  this.resetUploadForm();
                  this.notificationService.i18nShow("USER_AVATAR.AVATAR_UPLOAD_SUCCESS_MSG");
                },
                (err) => {
                  console.log(err);
                  this.notificationService.i18nShow("USER_AVATAR.ERROR_MSGS.ERROR_SAVING_AVATAR");
                });
          });
      }
    }
  }

  deleteCurrentAvatar(): void {
    this.userAvatarService.deleteUserAvatar()
      .subscribe(
        (isDeleteSuccess: boolean) => {
          if (isDeleteSuccess) {
            this.notificationService.i18nShow("USER_AVATAR.AVATAR_DELETE_SUCCESS_MSG");
          } else {
            this.notificationService.i18nShow("USER_AVATAR.ERROR_MSGS.ERROR_DELETING_AVATAR");
          }
        });
  }

  cancel(): void {
    this.redirectToUserProfile();
  }

  fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let currentThis = this;

    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      currentThis.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
    currentThis.fileName = file.name;
  }

  private resetUploadForm(): void {
    // Reset FormGroup
    this.uploadImageForm.reset();
    // Manually reset native form element to clear out file input element (file input element currently not natively supported in FormGroup)
    this.uploadForm.nativeElement.reset();
  }

  private redirectToUserProfile(): void {
    this.router.navigateByUrl('/user-profile');
  }

  private extractCroppedImageAsFile(imageSrc: string, fileName: string): Promise<File> {
    let currentThis = this;

    // separate out the mime component
    let mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];

    return currentThis.srcToFile(imageSrc, fileName, mimeString)
      .then(file => file);
  }

  private srcToFile(src, fileName, mimeType): Promise<File> {
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
  }

  private initUploadImageFormGroup(): FormGroup {
    return this.formBuilder.group({
      fileUploadInput: [null,
        [
          FileValidator.validate
        ]
      ]
    });
  }
}

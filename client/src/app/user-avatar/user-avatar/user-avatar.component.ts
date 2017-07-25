import {Component, OnInit, ViewChild} from "@angular/core";
import {CropperSettings, ImageCropperComponent} from "ng2-image-cropper";
import {UserAvatarService} from "../shared/user-avatar.service";
import {NotificationService} from "../../core/notification.service";
import {Router} from "@angular/router";
import {UserAvatarMonitoringService} from "../../shared/user-avatar-monitoring.service";
import {AvatarImage} from "../shared/avatar-image.model";

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

  data: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private router: Router,
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
  }

  ngOnInit(): void {
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
                  this.notificationService.i18nShow("USER_AVATAR.AVATAR_UPLOAD_SUCCESS_MSG");
                  this.redirectToUserProfile();
                },
                (err) => {
                  console.log(err);
                  this.notificationService.i18nShow("USER_AVATAR.ERROR_MSGS.ERROR_SAVING_AVATAR");
                });
          });
      }
    }
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
}

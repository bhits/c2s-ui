import {Component, OnInit, ViewChild} from "@angular/core";
import {CropperSettings, ImageCropperComponent} from "ng2-image-cropper";

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
  data: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = CROPPED_IMAGE_WIDTH;
    this.cropperSettings.croppedHeight = CROPPED_IMAGE_HEIGHT;
    this.cropperSettings.canvasWidth = CANVAS_WIDTH;
    this.cropperSettings.canvasHeight = CANVAS_HEIGHT;
    this.cropperSettings.cropperClass = CROPPING_CANVAS_CLASS;
    this.cropperSettings.croppingClass = CLASS_WHEN_IMAGE_FILE_SELECTED;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  ngOnInit(): void {
  }

  submitCroppedImage() {
    // TODO: Repalce this with call to backend service to save cropped avatar image
    console.log(this.data);
  }

  fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;

    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }
}

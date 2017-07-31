export class AvatarImage {
  constructor() {
    this.fileContents = null;
    this.fileExtension = null;
    this.fileWidthPixels = null;
    this.fileHeightPixels = null;
  }

  fileContents: string;  // this is a Base64 string
  fileExtension: string;
  fileWidthPixels: number;
  fileHeightPixels: number;
}

export class AvatarFileUploadRequest {
  fileContents: string;  // this is a Base64 string
  fileExtension: string;
  fileName: string;
  fileSizeBytes: number;
  fileWidthPixels: number;
  fileHeightPixels: number;
}

export class UploadedDocument {
  id: number;
  sampleDocument: boolean;
  fileName: string;
  documentName: string;
  contentType: string;
  description?: string;
  documentTypeCodeId: number;
  documentTypeDisplayName: string;
}

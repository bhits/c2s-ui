import {PatientHealthDataCdaDocumentAuthor} from "./patient-health-data-cda-document-author.model";

export class PatientHealthDataCdaDocumentSection {
  title: string;
  content: string;
  contentMimeType: string;
  author: PatientHealthDataCdaDocumentAuthor;
  m_ClinicalStatements: string;
  beid: string;
}

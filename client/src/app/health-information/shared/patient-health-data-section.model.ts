import {PatientHealthDataAuthor} from "./patient-health-data-author.model";

export class PatientHealthDataSection {
  title: string;
  content: string;
  contentMimeType: string;
  author: PatientHealthDataAuthor;
  m_ClinicalStatements: string;
  beid: string;
}

import {Consent} from "./consent.model";

export class ConsentList {
  consentList: Consent[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}

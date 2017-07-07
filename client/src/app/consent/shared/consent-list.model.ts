import {DetailedConsent} from "./detailed-consent.model";
import {Page} from "../../shared/page.model";

export class ConsentList extends Page {
  content: DetailedConsent[];
}

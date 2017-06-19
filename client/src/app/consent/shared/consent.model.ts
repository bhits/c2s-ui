import {ShareSensitivityCategory} from "./share-sensitivity-category.model";
import {SharePurpose} from "./share-purpose.model";
import {ConsentProvider} from "../../shared/consent-provider.model";

export class Consent {
  id: number;
  consentReferenceId: string;
  consentStage: string;
  fromProviders: ConsentProvider[];
  toProviders: ConsentProvider[];
  shareSensitivityCategories: ShareSensitivityCategory[];
  sharePurposes: SharePurpose[];
  startDate: Date;
  endDate: Date;
}

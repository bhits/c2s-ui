import {AbstractProvider} from "../../shared/abstract-provider.model";
import {ShareSensitivityCategory} from "./share-sensitivity-category.model";
import {SharePurpose} from "./share-purpose.model";

export class Consent {
  id: number;
  consentStage: string;
  fromProviders: AbstractProvider[];
  toProviders: AbstractProvider[];
  shareSensitivityCategories: ShareSensitivityCategory[];
  sharePurposes: SharePurpose[];
  startDate: Date;
  endDate: Date;
}

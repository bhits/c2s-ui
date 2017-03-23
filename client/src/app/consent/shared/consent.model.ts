import {ShareSensitivityCategories} from "./share-sensitivity-categories.model";
import {SharePurposes} from "./share-purposes.model";
import {ConsentProvider} from "../../shared/consent-provider.model";

export class Consent {
  id: number;
  fromProviders: ConsentProvider[];
  toProviders: ConsentProvider[];
  shareSensitivityCategories: ShareSensitivityCategories;
  sharePurposes: SharePurposes;
  startDate: Date;
  endDate: Date;
}

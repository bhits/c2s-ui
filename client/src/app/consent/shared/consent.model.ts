import {ShareSensitivityCategories} from "./share-sensitivity-categories.model";
import {SharePurposes} from "./share-purposes.model";
import {AbstractProvider} from "../../shared/abstract-provider.model";

export class Consent {
  id: number;
  fromProviders: AbstractProvider[];
  toProviders: AbstractProvider[];
  shareSensitivityCategories: ShareSensitivityCategories;
  sharePurposes: SharePurposes;
  startDate: Date;
  endDate: Date;
}

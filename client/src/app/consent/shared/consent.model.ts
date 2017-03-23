import {AbstractProvider} from "./abstract-provider.model";
import {ShareSensitivityCategories} from "./share-sensitivity-categories.model";
import {SharePurposes} from "./share-purposes.model";

export class Consent {
  id: number;
  fromProviders: AbstractProvider[];
  toProviders: AbstractProvider[];
  shareSensitivityCategories: ShareSensitivityCategories;
  sharePurposes: SharePurposes;
  startDate: string;
  endDate: string;
}

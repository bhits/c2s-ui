

import {EntityType} from "./entity-type.enum";

export class Provider {
  deletable: boolean;
  entityType:EntityType;
  firstLinePracticeLocationAddress:string;
  firstName:string;
  lastName:string;
  npi:string;
  orgName:string;
  practiceLocationAddressCityName:string;
  practiceLocationAddressCountryCode:string;
  practiceLocationAddressPostalCode:string;
  practiceLocationAddressStateName:string;
  practiceLocationAddressTelephoneNumber:string;
  secondLinePracticeLocationAddress:string;
}

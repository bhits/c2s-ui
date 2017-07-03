import {ListOfIdentifiers} from "../../shared/list-of-identifiers.model";
import {UmsProfileAddress} from "../../shared/ums-profile-address.model";

export class UmsFullProfileView {
  userId: number;
  userAuthId: string;
  userLocale: string;
  supportedLocales: string[];
  username: string;
  lastName: string;
  firstName: string;
  middleName: string;
  genderCode: string;
  mrn: string;
  birthDate: Date;
  socialSecurityNumber: string;
  homeAddress: UmsProfileAddress;
  homeEmail: string;
  homePhone: string;
  roles: string[];
  identifers: ListOfIdentifiers;
  registrationPurposeEmail: string;
}

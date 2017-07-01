import {Address} from "../../shared/address.model";
import {ListOfIdentifiers} from "../../shared/list-of-identifiers.model";

export class UmsFullProfileView {
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
  homeAddress: Address;
  homeEmail: string;
  homePhone: string;
  roles: string[];
  identifers: ListOfIdentifiers;
  registrationPurposeEmail: string;
}

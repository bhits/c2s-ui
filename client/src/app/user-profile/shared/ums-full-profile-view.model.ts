import {ListOfIdentifiers, UmsProfileAddress} from "c2s-ng-shared";

export class UmsFullProfileView {
  userId: number;
  userAuthId: string;
  userLocale: string;
  supportedLocales: string[];
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

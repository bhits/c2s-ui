import {IdentifierSystem, Role} from "c2s-ng-shared";
import {ProfileFieldsCodesLookup} from "./profile-fields-codes-lookup.model";

export class ProfileFieldsLookupInfo {
  public roles: Role[];
  public genderCodes: ProfileFieldsCodesLookup[];
  public stateCodes: ProfileFieldsCodesLookup[];
  public countryCodes: ProfileFieldsCodesLookup[];
  public locales: ProfileFieldsCodesLookup[];
  public identifierSystems: IdentifierSystem[];
}

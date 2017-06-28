import {Role} from "./role.model";
import {ProfileFieldsCodesLookup} from "./profile-fields-codes-lookup.model";
import {IdentifierSystem} from "./identifier-system.model";

export class ProfileFieldsLookupInfo {
  public roles: Role[];
  public genderCodes: ProfileFieldsCodesLookup[];
  public stateCodes: ProfileFieldsCodesLookup[];
  public countryCodes: ProfileFieldsCodesLookup[];
  public locales: ProfileFieldsCodesLookup[];
  public identifierSystems: IdentifierSystem[];
}

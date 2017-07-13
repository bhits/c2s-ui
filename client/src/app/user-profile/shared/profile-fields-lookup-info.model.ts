import {Role} from "../../shared/role.model";
import {ProfileFieldsCodesLookup} from "./profile-fields-codes-lookup.model";
import {IdentifierSystem} from "../../shared/identifier-system.model";

export class ProfileFieldsLookupInfo {
  public roles: Role[];
  public genderCodes: ProfileFieldsCodesLookup[];
  public stateCodes: ProfileFieldsCodesLookup[];
  public countryCodes: ProfileFieldsCodesLookup[];
  public locales: ProfileFieldsCodesLookup[];
  public identifierSystems: IdentifierSystem[];
}

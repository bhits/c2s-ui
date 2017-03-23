import {Identifier} from "../../shared/identifier.model";
import {Address} from "../../shared/address.model";
import {ProviderType} from "./provider-type.enum";
export class AbstractProvider {
  identifiers: Identifier[];
  address: Address;
  providerType: ProviderType;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name?: string;
}

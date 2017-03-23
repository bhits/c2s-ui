import {Identifier} from "../../shared/identifier.model";
import {Address} from "../../shared/address.model";
export class AbstractProvider {
  identifiers: Identifier[];
  address: Address;
  providerType: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name?: string;
}

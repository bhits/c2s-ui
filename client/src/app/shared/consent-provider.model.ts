import {Identifier} from "./identifier.model";
import {Address} from "./address.model";
export class ConsentProvider {
  id: number;
  identifiers: Identifier[];
  address: Address;
  providerType: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name?: string;
  deletable: boolean;
}

import {Identifier} from "./identifier.model";
export class ListOfIdentifiers {
  identifiers: Identifier[];

  constructor(identifiers: Identifier[]) {
    this.identifiers = identifiers;
  }
}

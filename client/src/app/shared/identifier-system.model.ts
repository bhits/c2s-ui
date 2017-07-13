import {RequiredIdentifierSystem} from "./required-identifier-system.model";

export class IdentifierSystem {
  public system: string;
  public display?: string;
  public oid?: string;
  public requiredIdentifierSystemsByRole?: Map<string, RequiredIdentifierSystem[]>;
}

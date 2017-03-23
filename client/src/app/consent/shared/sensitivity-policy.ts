
import {SensitivityPolicyCode} from "./sensitivity-policy-code.enum";

export class SensitivityPolicy {
  code: SensitivityPolicyCode;
  description: string;
  displayName: string;
  displayOrder: number;
  federal: boolean;
  system: string;
}

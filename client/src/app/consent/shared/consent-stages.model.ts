import {ConsentStage} from "./consent-stage.model";

export const CONSENT_STAGES: ConsentStage[] = [
  {
    consentStage: "CONSENT_SAVED",
    text: "IN PROGRESS",
    icon: "edit",
    color: "accent"
  },
  {
    consentStage: "CONSENT_SIGNED",
    text: "SIGNED",
    icon: "check_circle",
    color: "primary"
  },
  {
    consentStage: "REVOCATION_REVOKED",
    text: "REVOKED",
    icon: "cancel",
    color: "warn"
  }];

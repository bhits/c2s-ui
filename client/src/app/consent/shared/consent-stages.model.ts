import {ConsentStage} from "./consent-stage.model";

export const CONSENT_STAGES: ConsentStage[] = [
  {
    consentStage: "CONSENT_SAVED",
    text: "IN PROGRESS",
    icon: "edit",
    color: "accent",
    options: [
      {icon: "edit", text: "Edit This Consent", routerLink: '/consent-create-edit'},
      {icon: "search", text: "Preview This Consent"},
      {icon: "assignment_turned_in", text: "Provide eSignature", routerLink: '/consent-sign'},
      {icon: "pageview", text: "Try My Consent Settings against My Medical Record before Sharing"},
      {icon: "delete_forever", text: "Delete This Consent"}]
  },
  {
    consentStage: "CONSENT_SIGNED",
    text: "SIGNED",
    icon: "check_circle",
    color: "primary",
    options: [
      {icon: "file_download", text: "View Signed Consent"},
      {icon: "insert_drive_file", text: "Export Consent Directive"},
      {icon: "pageview", text: "Try My Consent Settings against My Medical Record before Sharing"},
      {icon: "cancel", text: "Revocation", routerLink: '/consent-revoke'}
    ]
  },
  {
    consentStage: "REVOCATION_REVOKED",
    text: "REVOKED",
    icon: "cancel",
    color: "warn",
    options: [
      {icon: "file_download", text: "View Signed Consent"},
      {icon: "insert_drive_file", text: "Export Consent Directive"},
      {icon: "pageview", text: "Try My Consent Settings against My Medical Record before Sharing"},
      {icon: "file_download", text: "View Signed Revocation"}
    ]
  }];

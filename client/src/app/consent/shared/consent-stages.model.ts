import {ConsentStage} from "./consent-stage.model";
import {ConsentStageOptionKey} from "./consent-stage-option-key.enum";

export const CONSENT_STAGES: ConsentStage[] = [
  {
    consentStage: "SAVED",
    text: "IN PROGRESS",
    icon: "edit",
    color: "accent",
    options: [
      {key: ConsentStageOptionKey.EDIT, icon: "edit", text: "Edit This Consent", routerLink: '/consent-create-edit'},
      {key: ConsentStageOptionKey.DOWNLOAD_SAVED_PDF, icon: "search", text: "Preview This Consent", isMethod: true},
      {key: ConsentStageOptionKey.SIGN, icon: "assignment_turned_in", text: "Provide eSignature", routerLink: '/consent-sign'},
      {key: ConsentStageOptionKey.TRY_MY_POLICY, icon: "pageview", text: "Try My Consent Settings against My Medical Record before Sharing"},
      {key: ConsentStageOptionKey.DELETE, icon: "delete_forever", text: "Delete This Consent", isMethod: true}]
  },
  {
    consentStage: "SIGNED",
    text: "SIGNED",
    icon: "check_circle",
    color: "primary",
    options: [
      {key: ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF, icon: "file_download", text: "View Signed Consent", isMethod: true},
      {key: ConsentStageOptionKey.EXPORT_CONSENT_DIRECTIVE, icon: "insert_drive_file", text: "Export Consent Directive"},
      {key: ConsentStageOptionKey.TRY_MY_POLICY, icon: "pageview", text: "Try My Consent Settings against My Medical Record before Sharing"},
      {key: ConsentStageOptionKey.REVOKE, icon: "cancel", text: "Revocation", routerLink: '/consent-revoke'}
    ]
  },
  {
    consentStage: "REVOKED",
    text: "REVOKED",
    icon: "cancel",
    color: "warn",
    options: [
      {key: ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF, icon: "file_download", text: "View Signed Consent", isMethod: true},
      {key: ConsentStageOptionKey.EXPORT_CONSENT_DIRECTIVE, icon: "insert_drive_file", text: "Export Consent Directive"},
      {key: ConsentStageOptionKey.TRY_MY_POLICY, icon: "pageview", text: "Try My Consent Settings against My Medical Record before Sharing"},
      {key: ConsentStageOptionKey.DOWNLOAD_REVOKED_PDF, icon: "file_download", text: "View Signed Revocation"}
    ]
  }];

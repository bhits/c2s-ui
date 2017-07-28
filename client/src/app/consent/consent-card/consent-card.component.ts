import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DetailedConsent} from "../shared/detailed-consent.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {CONSENT_STAGES} from "../shared/consent-stages.model";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../core/notification.service";
import {ConsentStageOptionKey} from "../shared/consent-stage-option-key.enum";
import {BinaryFile} from "../shared/binary-file.model";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TryPolicyService} from "../shared/try-policy.service";
import {TryPolicyResponse} from "src/app/consent/shared/try-policy-response.model";

@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['consent-card.component.scss']
})
export class ConsentCardComponent implements OnInit, OnChanges {
  @Input() consent: DetailedConsent;
  @Output() private deleteConsent = new EventEmitter<number>();

  public tryPolicyForm: FormGroup;
  public uploadedDocumentList: UploadedDocument[];

  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private tryPolicyService: TryPolicyService) {
  }

  ngOnInit() {
    this.uploadedDocumentList = this.route.snapshot.data['patientUploadedDocuments'];
    this.detailsVisible = false;
    this.tryPolicyForm = this.initTryPolicyFormFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private initTryPolicyFormFormGroup() {
    return this.formBuilder.group({
      documentId: [null, Validators.required],
      purposeOfUse: [null, Validators.required]
    })
  }

  toggleDetailsVisible(el: any) {
    this.detailsVisible = !this.detailsVisible;
    this.height = this.height ? 0 : el.scrollHeight;
  }

  onResize(event: any, el: any) {
    this.height = this.height ? el.scrollHeight : 0;
  }

  hasDoNotShareSensitivityPolicyCodes(): boolean {
    return !!this.consent && !!this.consent.shareSensitivityCategories &&
      this.consent.shareSensitivityCategories.length > 0;
  }

  getHeightPx(): string {
    return `${this.height}px`;
  }

  getConsentStageOptions(): ConsentStageOption[] {
    return CONSENT_STAGES
      .filter(consentStage => consentStage.consentStage === this.consent.consentStage)
      .map(consentStage => consentStage.options)
      .pop();
  }

  getRouterLink(consentOption: ConsentStageOption): any {
    return consentOption.routerLink ? [consentOption.routerLink, this.consent.id] : '.'
  }

  selectConsentMethodOption(consentOption: ConsentStageOption): boolean {
    return consentOption.isMethod;
  }

  invokeAction(consentOption: ConsentStageOption, consentOptionsDialog: any, deleteConfirmationDialog: any, tryPolicyDialog: any) {
    switch (consentOption.key) {
      case ConsentStageOptionKey.APPLY_TRY_POLICY:
        tryPolicyDialog.open();
        break;
      case ConsentStageOptionKey.DELETE:
        deleteConfirmationDialog.open();
        break;
      case ConsentStageOptionKey.DOWNLOAD_SAVED_PDF:
        this.consentService.getSavedConsentPdf(this.consent.id)
          .subscribe((savedPdf: BinaryFile) => this.consentService.handleDownloadSuccess(savedPdf, this.consent.id, consentOptionsDialog, "Saved_Consent"),
            this.consentService.handleDownloadError);
        break;
      case ConsentStageOptionKey.DOWNLOAD_SIGNED_PDF:
        this.consentService.getSignedConsentPdf(this.consent.id)
          .subscribe((signedPdf: BinaryFile) => this.consentService.handleDownloadSuccess(signedPdf, this.consent.id, consentOptionsDialog, "Signed_Consent"),
            this.consentService.handleDownloadError);
        break;
      case ConsentStageOptionKey.DOWNLOAD_REVOKED_PDF:
        this.consentService.getRevokedConsentPdf(this.consent.id)
          .subscribe((revokedPdf: BinaryFile) => this.consentService.handleDownloadSuccess(revokedPdf, this.consent.id, consentOptionsDialog, "Revoked_Consent"),
            this.consentService.handleDownloadError);
        break;
    }
  }

  confirmDeleteConsent(dialog: any) {
    dialog.close();
    this.consentService.deleteConsent(this.consent.id)
      .subscribe(
        () => {
          this.deleteConsent.emit(this.consent.id);
          this.notificationService.i18nShow("CONSENTS.CARD.MANAGE_CONSENT_DIALOG.DELETE_CONSENT_DIALOG.DELETE_SUCCESS_MSG");
        },
        err => {
          this.notificationService.i18nShow("CONSENTS.CARD.MANAGE_CONSENT_DIALOG.DELETE_CONSENT_DIALOG.DELETE_FAIL_MSG");
          console.log(err);
        });
  }

  public applyTryPolicy(dialog: any): void {
    dialog.close();
    let tryPolicyInput = this.tryPolicyForm.value;
    this.tryPolicyService.applyTryPolicyAgainstConsent(this.consent.id, tryPolicyInput.documentId, tryPolicyInput.purposeOfUse)
      .subscribe(
        (tryPolicyResponse: TryPolicyResponse) =>
          this.tryPolicyService.handleApplyTryPolicySuccess(tryPolicyResponse),
        err => {
          this.notificationService.i18nShow("CONSENTS.CARD.MANAGE_CONSENT_DIALOG.TRY_POLICY_CONSENT_DIALOG.TRY-POLICY-ERROR");
        });
  }

  public backToOptions(applyTryPolicyDialog: any, consentOptionsDialog: any): void {
    applyTryPolicyDialog.close();
    consentOptionsDialog.open();
  }
}

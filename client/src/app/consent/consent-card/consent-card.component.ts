import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import {Consent} from "../shared/consent.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {CONSENT_STAGES} from "../shared/consent-stages.model";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../core/notification.service";
import {ConsentStageOptionKey} from "../shared/consent-stage-option-key.enum";
import {BinaryFile} from "../shared/binary-file.model";
import {TranslateService} from "@ngx-translate/core";
import {UploadedDocument} from "../shared/uploaded-document.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TryPolicy} from "../shared/tryPolicy.model";
import {TryPolicyResponse} from "../shared/tryPolicy-response.model";

@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['consent-card.component.scss']
})
export class ConsentCardComponent implements OnInit, OnChanges {

  @Input() consent: Consent;
  public uploadedDocumentList: UploadedDocument[];
  @Output() private deleteConsent = new EventEmitter<number>();
  public tryPolicyForm: FormGroup;

  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private translate: TranslateService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.detailsVisible = false;
    this.tryPolicyForm = this.initTryPolicyFormFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  hasUploadedDocuments(): boolean {
    return !!this.uploadedDocumentList && this.uploadedDocumentList.length > 0;
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
      case ConsentStageOptionKey.APPLY_TRY_POLICY:{
        this.consentService.getUploadedDocumentList()
          .subscribe(
            (docList: UploadedDocument[]) => {
              this.uploadedDocumentList = docList;
              consentOptionsDialog.close();
              tryPolicyDialog.open();
            },
            err => {
              consentOptionsDialog.close();
              this.consentService.handleShowUploadedDocumentListError(err);
            });

        break;
      }
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
          this.notificationService.show("Success in deleting consent.");
        },
        err => {
          this.notificationService.show("Failed to delete the consent, please try again later...");
          console.log(err);
        });
  }

  applyTryPolicy(dialog: any){
    let tryPolicyInput =  this.prepareTryPolicyInput();
    dialog.close();
    this.consentService.getTryPolicyXHTML(tryPolicyInput.documentId, tryPolicyInput.purposeOfUse, this.consent.id)
      .subscribe((encodedDocument: TryPolicyResponse) => this.consentService.handleTryPolicySuccess(encodedDocument),
        err => {
          this.notificationService.i18nShow("CONSENTS.CARD.MANAGE_CONSENT_DIALOG.TRYPOLICY_CONSENT_DIALOG.TRY-POLICY-ERROR");
          console.log(err);
        });

  }

  private initTryPolicyFormFormGroup(){
    return this.formBuilder.group({
      documentId: [null, Validators.required],
      purposeOfUse: [null, Validators.required]
    })
  }

  private prepareTryPolicyInput(): TryPolicy {
    const formModel = this.tryPolicyForm.value;
    return {
      documentId: formModel.documentId,
      purposeOfUse: formModel.purposeOfUse
    };
  }


}

import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import {Consent} from "../shared/consent.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {CONSENT_STAGES} from "../shared/consent-stages.model";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../core/notification.service";
import {ConsentStageOptionKey} from "../shared/consent-stage-option-key.enum";
import {BinaryFile} from "../shared/binary-file.model";
import {UtilityService} from "../../shared/utility.service";


@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['./consent-card.component.css']
})
export class ConsentCardComponent implements OnInit, OnChanges {

  @Input() consent: Consent;
  @Output() private deleteConsent = new EventEmitter<number>();

  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.detailsVisible = false;
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

  invokeAction(consentOption: ConsentStageOption, consentOptionsDialog: any, deleteConfirmationDialog: any) {
    switch (consentOption.key) {
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
}

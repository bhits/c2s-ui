import {Component, OnInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Consent} from "../shared/consent.model";
import {ConsentStageOption} from "../shared/consent-stage-option.model";
import {CONSENT_STAGES} from "../shared/consent-stages.model";
import {ConsentService} from "../shared/consent.service";
import {NotificationService} from "../../core/notification.service";
import {Router} from "@angular/router";


@Component({
  selector: 'c2s-consent-card',
  templateUrl: './consent-card.component.html',
  styleUrls: ['./consent-card.component.css']
})
export class ConsentCardComponent implements OnInit, OnChanges {

  @Input() private consent: Consent;

  private detailsVisible: boolean = false;
  private height: number = 0;

  constructor(private consentService: ConsentService,
              private notificationService: NotificationService,
              private router: Router) {
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

  confirmDeleteConsent(dialog: any) {
    dialog.close();
    this.consentService.deleteConsent(this.consent.id)
      .subscribe(
        () => {
          this.router.navigate(["home"]);
          this.notificationService.show("Success in deleting consent.");
        },
        err => {
          this.notificationService.show("Failed to delete the consent, please try again later...");
          console.log(err);
        });
  }
}

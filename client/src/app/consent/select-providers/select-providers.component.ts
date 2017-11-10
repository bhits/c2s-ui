import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ConsentService} from "../shared/consent.service";
import {Consent, ConsentProvider, ProviderId} from "c2s-ng-shared";

@Component({
  selector: 'c2s-select-providers',
  templateUrl: './select-providers.component.html',
  styleUrls: ['./select-providers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectProvidersComponent implements OnInit {

  @Input() providers: ConsentProvider[];
  fromProviders: ProviderId[];
  toProviders: ProviderId[];
  consent: Consent;
  @Input() completeSelectedProviders: ConsentProvider[] = [];

  constructor(private consentService: ConsentService) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.consent = consent;
        this.fromProviders = this.consent.fromProviders;
        this.toProviders = this.consent.toProviders;
      }
    });
  }

  ngOnInit() {
    this.getAllSelectedProvidersProperties();
  }

  getAllSelectedProvidersProperties() {

    this.providers.forEach(p1 => {
      if (this.fromProviders && this.fromProviders) {
        this.fromProviders.forEach(identifier1 => {
          if (p1.id === identifier1.id) {
            this.completeSelectedProviders.push(p1);
          }
        });
      }
    });
  }
}

import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ConsentService} from "../shared/consent.service";
import {ListOfIdentifiers} from "../../shared/list-of-identifiers.model";
import {Consent} from "../shared/consent.model";
import {ConsentProvider} from "../../shared/consent-provider.model";

@Component({
  selector: 'c2s-select-providers',
  templateUrl: './select-providers.component.html',
  styleUrls: ['./select-providers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectProvidersComponent implements OnInit {

  @Input() providers: ConsentProvider[];
  fromProviders: ListOfIdentifiers;
  toProviders: ListOfIdentifiers;
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
      if (this.fromProviders && this.fromProviders.identifiers) {
        this.fromProviders.identifiers.forEach(identifier => {
          if (p1.npi === identifier.value) {
            this.completeSelectedProviders.push(p1);
          }
        });
      }
    });
  }
}

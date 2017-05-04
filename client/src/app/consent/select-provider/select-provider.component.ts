import {Component, OnInit, Input} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import 'rxjs/add/operator/toPromise';
import {UtilityService} from "../../shared/utility.service";
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {Identifier} from "../../shared/identifier.model";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.css']
})
export class SelectProviderComponent implements OnInit {
  @Input() providers: ConsentProvider[];
  @Input() title:string;
  @Input() dialogTitle:string;
  @Input() isAuthorizedProviders:boolean;
  @Input() selectedProviders: ConsentProvider[] = null ;

  consent: ConsentCreateEdit;
  selectedProviderNpi:string;
  selectedProvider: ConsentProvider;

  constructor(private consentService: ConsentService,
              private utilityService:UtilityService,
              private translate: TranslateService) {
    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    this.setSelectedProvider();
  }

  setSelectedProvider(){
    if(this.isAuthorizedProviders&&
      (this.consent.fromProviders.identifiers) &&
      (this.consent.fromProviders.identifiers.length>0)){
      this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.consent.fromProviders.identifiers[0].value);
    }else if((!this.isAuthorizedProviders)&&
      (this.consent.toProviders.identifiers) &&
      (this.consent.toProviders.identifiers.length>0)){
      this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.consent.toProviders.identifiers[0].value);
    }
  }

  openDialog(dialog: any){
    dialog.open();
  }
  closeDialog(dialog: any){
    dialog.close();
  }

  onAddSelectedProviders(dialog: any){
    this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.selectedProviderNpi);
    if(this.isAuthorizedProviders){
      this.consent.fromProviders = this.createListOfIdentifiers(this.selectedProvider);
      this.consentService.setConsent(this.consent);
    }else if(!this.isAuthorizedProviders){
      this.consent.toProviders = this.createListOfIdentifiers(this.selectedProvider);
      this.consentService.setConsent(this.consent);
    }
    dialog.close();
  }

  isSelected(npi:string):boolean {
    if ((this.isAuthorizedProviders) && this.consent.toProviders
      && this.consent.toProviders.identifiers && this.consent.toProviders.identifiers[0] ) {
          return (this.consent.toProviders.identifiers[0].value === npi);
    } else if((!this.isAuthorizedProviders) && this.consent.fromProviders &&
      this.consent.fromProviders.identifiers && this.consent.fromProviders.identifiers[0]) {
          return  (this.consent.fromProviders.identifiers[0].value === npi);
    }
    return false;
  }

  private createListOfIdentifiers(selctedProvider: ConsentProvider){
    let provider = new ListOfIdentifiers();
    if(selctedProvider){
      provider.identifiers = [new Identifier(selctedProvider.identifiers[0].system, selctedProvider.identifiers[0].value)];
    }
    return provider;
  }
}

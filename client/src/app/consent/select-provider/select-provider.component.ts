import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import 'rxjs/add/operator/toPromise';
import {UtilityService} from "../../shared/utility.service";
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {Identifier} from "../../shared/identifier.model";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";


@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.css']
})
export class SelectProviderComponent implements OnInit {
  @Input() providers: FlattenedSmallProvider[];
  @Input() title:string;
  @Input() dialogTitle:string;
  @Input() selectedProviders: FlattenedSmallProvider[] ;

  consent: ConsentCreateEdit;
  private selectedProviderNpi:string;
  private selectedProvider: FlattenedSmallProvider;

  private authorizeProviderNpi:string[];
  private disclosureProviderNpi:string[];

  constructor(private consentService: ConsentService, private utilityService:UtilityService) {
    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {

    // if(this.dialogTitle === 'Authorize' &&
    //   (this.utilityService.isDefined(this.selectedProvidersNpi.authorize)) &&
    //   (this.selectedProvidersNpi.authorize.length>0)){
    //   this.authorizeProviderNpi = this.selectedProvidersNpi.authorize;
    //   this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.authorizeProviderNpi[0]);
    // }else if(this.dialogTitle === 'Disclosure'&&
    //   (this.utilityService.isDefined(this.selectedProvidersNpi.disclosure)) &&
    //   (this.selectedProvidersNpi.disclosure.length>0)){
    //   this.disclosureProviderNpi = this.selectedProvidersNpi.disclosure;
    //   this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.disclosureProviderNpi[0]);
    // }
  }



  openDialog(dialog: any){
    dialog.open();
  }
  closeDialog(dialog: any){
    dialog.close();
  }

  onAddSelectedProviders(dialog: any){
    this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.selectedProviderNpi);
    if(this.dialogTitle === 'Authorize'){
      this.consent.fromProviders = this.createListOfIdentifiers(this.selectedProvider);
      this.consentService.setConsent(this.consent);
    }else if(this.dialogTitle === 'Disclosure'){
      this.consent.toProviders = this.createListOfIdentifiers(this.selectedProvider);
      this.consentService.setConsent(this.consent);
    }
    dialog.close();
  }

  isSelected(npi:string):boolean {
    if ((this.dialogTitle === 'Authorize') && this.consent.toProviders
      && this.consent.toProviders.identifiers && this.consent.toProviders.identifiers[0] ) {
          return (this.consent.toProviders.identifiers[0].value === npi);
    } else if((this.dialogTitle === 'Disclosure') && this.consent.fromProviders &&
      this.consent.fromProviders.identifiers && this.consent.fromProviders.identifiers[0]) {
          return  (this.consent.fromProviders.identifiers[0].value === npi);
    }
    return false;
  }

  private createListOfIdentifiers(selctedProvider: FlattenedSmallProvider){
    let provider = new ListOfIdentifiers();
    if(selctedProvider){
      provider.identifiers = [new Identifier(selctedProvider.system, selctedProvider.npi)];
    }
    return provider;
  }
}

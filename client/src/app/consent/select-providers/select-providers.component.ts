import {Component, OnInit, Input} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {UtilityService} from "../../shared/utility.service";
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";

@Component({
  selector: 'c2s-select-providers',
  templateUrl: './select-providers.component.html',
  styleUrls: ['./select-providers.component.css']
})
export class SelectProvidersComponent implements OnInit {

  authorizeTitle:string = "The following individual or organization";
  discloseTitle:string = "To disclose my information to";
  @Input() providers: FlattenedSmallProvider[];
  fromProviders: ListOfIdentifiers;
  toProviders: ListOfIdentifiers;
  consent: ConsentCreateEdit;
  @Input() completeSelectedProviders: FlattenedSmallProvider[] = [];
  selectedProvidersNpi:any = {authorize:[], disclosure:[]};

  constructor(private consentService: ConsentService,private utilityService:UtilityService) {
    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;
        this.fromProviders = this.consent.fromProviders;
        this.toProviders = this.consent.toProviders;
      }
    });
  }

  ngOnInit() {
    this.getAllSelectedProvidersProperties();

    // this.fromProviders =
    // if(this.authorizeOrgProviderNpi.length >0){
    //   this.selectedProvidersNpi.authorize = this.authorizeOrgProviderNpi;
    // }else if(this.authorizeIndProviderNpi.length >0){
    //   this.selectedProvidersNpi.authorize = this.authorizeIndProviderNpi;
    // }

    // if(this.disclosureOrgProviderNpi.length >0){
    //   this.selectedProvidersNpi.disclosure = this.disclosureOrgProviderNpi;
    // }else if(this.disclosureIndProviderNpi.length >0){
    //   this.selectedProvidersNpi.disclosure = this.disclosureIndProviderNpi;
    // }
  }

  getAllSelectedProvidersProperties(){

    this.providers.forEach(p1 =>{
      if(this.fromProviders && this.fromProviders.identifiers){
        this.fromProviders.identifiers.forEach(identifier =>{
          if(p1.npi === identifier.value){
            this.completeSelectedProviders.push(p1);
          }
        });
      }
    });
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

import {Component, OnInit, Input} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {UtilityService} from "../../shared/utility.service";
import {ListOfIdentifiers} from "../../shared/list-of-identifiers.model";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-select-providers',
  templateUrl: './select-providers.component.html',
  styleUrls: ['./select-providers.component.css']
})
export class SelectProvidersComponent implements OnInit {

  @Input() providers: ConsentProvider[];
  fromProviders: ListOfIdentifiers;
  toProviders: ListOfIdentifiers;
  consent: ConsentCreateEdit;
  @Input() completeSelectedProviders: ConsentProvider[] = [];
  selectedProvidersNpi:any = {authorize:[], disclosure:[]};

  constructor(private consentService: ConsentService,
              private utilityService:UtilityService,
              private translate: TranslateService) {
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
}

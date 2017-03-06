import {Component, OnInit,Input} from '@angular/core';

import {Provider} from "../shared/Provider";
import {ConsentService} from "../shared/consent.service";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-select-providers',
  templateUrl: './select-providers.component.html',
  styleUrls: ['./select-providers.component.css']
})
export class SelectProvidersComponent implements OnInit {

  @Input() providers: Provider[];
  authorizeTitle:string = "The following individual or organization";
  discloseTitle:string = "To disclose my information to";
  @Input() authorizeOrgProviderNpi: string[];
  @Input() authorizeIndProviderNpi: string[];
  @Input() disclosureOrgProviderNpi: string[] ;
  @Input() disclosureIndProviderNpi: string[] ;

  selectedProvidersNpi:any = {authorize:[], disclosure:[]};

  constructor(private consentService: ConsentService,private utilityService:UtilityService) { }

  ngOnInit() {
    if(this.authorizeOrgProviderNpi.length >0){
      this.selectedProvidersNpi.authorize = this.authorizeOrgProviderNpi;
    }else if(this.authorizeIndProviderNpi.length >0){
      this.selectedProvidersNpi.authorize = this.authorizeIndProviderNpi;
    }

    if(this.disclosureOrgProviderNpi.length >0){
      this.selectedProvidersNpi.disclosure = this.disclosureOrgProviderNpi;
    }else if(this.disclosureIndProviderNpi.length >0){
      this.selectedProvidersNpi.disclosure = this.disclosureIndProviderNpi;
    }
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  onSelectedAuthorizeProvider(provider:Provider){
    //Remove all entry from array
    this.utilityService.removeAll(this.authorizeOrgProviderNpi);
    this.utilityService.removeAll(this.authorizeIndProviderNpi);


    if((provider) && provider.entityType === "Individual"){
      this.authorizeIndProviderNpi.push(provider.npi);
    }else if((provider) && provider.entityType === "Organization"){
      this.authorizeOrgProviderNpi.push(provider.npi);
    }
  }

  onSelectedDisclosureProvider(provider:Provider){
    //Remove all entry from array
    this.utilityService.removeAll(this.disclosureOrgProviderNpi);
    this.utilityService.removeAll(this.disclosureIndProviderNpi);

    if((provider) && provider.entityType === "Individual"){
      this.disclosureIndProviderNpi.push(provider.npi);
    }else if((provider) && provider.entityType === "Organization"){
      this.disclosureOrgProviderNpi.push(provider.npi);
    }

  }

}

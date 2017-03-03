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
  @Input() authorizeProviderNpi: string[];
  @Input() disclosureProviderNpi: string[] ;
  selectedProvidersNpi:any = {authorize:[], disclosure:[]};

  constructor(private consentService: ConsentService,private utilityService:UtilityService) { }

  ngOnInit() {
    if(this.authorizeProviderNpi.length >0){
      this.selectedProvidersNpi.authorize = this.authorizeProviderNpi;
    }

    if(this.disclosureProviderNpi.length >0){
      this.selectedProvidersNpi.disclosure = this.disclosureProviderNpi;
    }

    // this.consentService.getProviders()
    //   .then(res => {
    //     this.providers = res;
    //     if(this.authorizeProviderNpi.length >0){
    //       this.selectedProvidersNpi.authorize = this.authorizeProviderNpi;
    //     }
    //
    //     if(this.disclosureProviderNpi.length >0){
    //       this.selectedProvidersNpi.disclosure = this.disclosureProviderNpi;
    //     }
    //   })
    //   .catch(this.error);
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  onSelectedAuthorizeProvider(provider:Provider){
    //Remove all entry from array
    this.utilityService.removeAll(this.authorizeProviderNpi);
    this.authorizeProviderNpi.push(provider.npi);
  }

  onSelectedDisclosureProvider(provider:Provider){
    //Remove all entry from array
    this.utilityService.removeAll(this.disclosureProviderNpi);
    this.disclosureProviderNpi.push(provider.npi);
  }

}

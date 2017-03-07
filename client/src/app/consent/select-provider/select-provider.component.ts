import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {Provider} from "../shared/Provider.model";
import 'rxjs/add/operator/toPromise';
import {UtilityService} from "../../shared/utility.service";


@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.css']
})
export class SelectProviderComponent implements OnInit {
  @Input() providers: Provider[];
  @Input() title:string;
  @Input() dialogTitle:string;
  @Input() selectedProvidersNpi:any ;

  private selectedProviderNpi:string;
  private selectedProvider: Provider;

  private authorizeProviderNpi:string[];
  private disclosureProviderNpi:string[];

  @Output() selectedAuthorizeProvider= new EventEmitter();
  @Output() selectedDisclosureProvider= new EventEmitter();

  constructor(private consentService: ConsentService, private utilityService:UtilityService) {

  }

  ngOnInit() {
    if(this.dialogTitle === 'Authorize' &&
      (this.utilityService.isDefined(this.selectedProvidersNpi.authorize)) &&
      (this.selectedProvidersNpi.authorize.length>0)){
      this.authorizeProviderNpi = this.selectedProvidersNpi.authorize;
      this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.authorizeProviderNpi[0]);
    }else if(this.dialogTitle === 'Disclosure'&&
      (this.utilityService.isDefined(this.selectedProvidersNpi.disclosure)) &&
      (this.selectedProvidersNpi.disclosure.length>0)){
      this.disclosureProviderNpi = this.selectedProvidersNpi.disclosure;
      this.selectedProvider = this.consentService.getProviderByNPI(this.providers,this.disclosureProviderNpi[0]);
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
    if(this.dialogTitle === 'Authorize'){
      this.selectedAuthorizeProvider.emit(this.selectedProvider);
    }else if(this.dialogTitle === 'Disclosure'){
      this.selectedDisclosureProvider.emit(this.selectedProvider);
    }
    dialog.close();
  }

  isSelected(npi:string):boolean {
    if ((this.dialogTitle === 'Authorize') ) {
      return (this.selectedProvidersNpi.disclosure[0] === npi);
    } else if((this.dialogTitle === 'Disclosure')) {
      return (this.selectedProvidersNpi.authorize[0]=== npi);
    }
  }
}

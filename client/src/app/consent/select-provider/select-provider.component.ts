import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {Provider} from "../shared/Provider";
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'c2s-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.css']
})
export class SelectProviderComponent implements OnInit {
  @Input() providers: Provider[];
  @Input() title:string;
  @Input() dialogTitle:string;
  @Input() selectedProviderList:string[];

  private selectedProviderNpi:string;
  private selectedProvider:Provider;

  @Output() selectedAuthorizeProvider= new EventEmitter();
  @Output() selectedDisclosureProvider= new EventEmitter();

  constructor(private consentService: ConsentService) { }

  ngOnInit() {
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
  if (this.selectedProviderList.length>0) {
    return (this.selectedProviderList[0] === npi);
  } else {
    return false;
  }
}
}

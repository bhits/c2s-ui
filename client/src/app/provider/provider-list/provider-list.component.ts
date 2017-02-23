import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";
import {Provider} from "../shared/provider.model";
import {ProviderService} from "../shared/provider.service";

@Component({
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})

export class ProviderListComponent implements OnInit {
  listProviders: Provider[] = [];
  selectedOption: boolean;

  tHeads = [
    {text: '', cols: 1, color: 'lightgray'},
    {text: 'Name/Facility', cols: 3, color: 'lightgray'},
    {text: 'NPI', cols: 2, color: 'lightgray'},
    {text: 'Contact Number', cols: 2, color: 'lightgray'},
    {text: 'Address', cols: 5, color: 'lightgray'}
  ];

  constructor(private providerService: ProviderService,
              private confirmDialogService: ConfirmDialogService,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.providerService.getProviders()
      .then(providers => this.listProviders = providers);
  }

  confirmDeleteProvider() {
    this.confirmDialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?', this.viewContainerRef)
      .subscribe(res => this.selectedOption = res);
  }
}

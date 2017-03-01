import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";
import {Provider} from "../shared/provider.model";
import {ProviderService} from "../shared/provider.service";
import {PaginationInstance} from "ng2-pagination";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})

export class ProviderListComponent implements OnInit {
  providers: Provider[];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };
  accordionTab: boolean = true;

  constructor(private providerService: ProviderService,
              private confirmDialogService: ConfirmDialogService,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.providerService.getProviders()
      .then(res => this.providers = res);
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  confirmDeleteProvider(provider: Provider) {
    this.confirmDialogService
      .confirm('Delete Provider', 'Are you sure you want to delete this provider?', this.viewContainerRef)
      .subscribe(res => {
        this.deleteProvider(res, provider);
      });
  }

  deleteProvider(option: boolean, provider: Provider) {
    if (option) {
      this.providerService.deleteProvider(provider.npi)
        .then(() =>
          this.providers = this.providers.filter(p => p !== provider));
      console.log("Success in deleting provider:" + provider.npi)
    }
  }
}

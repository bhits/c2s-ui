import {Component, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {PaginationInstance} from "ng2-pagination";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../core/notification.service";
import {ConsentProvider} from "../../shared/consent-provider.model";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['provider-list.component.scss']
})

export class ProviderListComponent implements OnInit {
  providers: ConsentProvider[];
  title: string = "Providers";
  private selectedProvider: ConsentProvider;

  paginationConfig: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1
  };
  accordionTab: boolean = true;

  constructor(private route: ActivatedRoute,
              private notificationService: NotificationService,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    this.providers = this.route.snapshot.data['providers'];
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  openConfirmDialog(dialog: any, provider: ConsentProvider) {
    dialog.open();
    this.selectedProvider = provider;
  }

  confirmDeleteProvider(dialog: any) {
    dialog.close();
    if (this.selectedProvider != null) {
      this.providerService.deleteProvider(this.selectedProvider.id)
        .subscribe(
          () => {
            this.providers = this.providers.filter(p => p !== this.selectedProvider);
            this.notificationService.show("Success in deleting provider.");
          },
          err => {
            this.notificationService.show("Failed to delete the provider, please try again later...");
            console.log(err);
          });
    }
  }
}

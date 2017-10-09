import {Component, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {PaginationInstance} from "ng2-pagination";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../core/notification.service";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {TokenService} from "../../security/shared/token.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {UtilityService} from "../../core/utility.service";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['provider-list.component.scss']
})

export class ProviderListComponent implements OnInit {
  providers: ConsentProvider[];
  private selectedProvider: ConsentProvider;

  paginationConfig: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1
  };

  constructor(private apiUrlService: C2sUiApiUrlService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private providerService: ProviderService,
              private tokenService: TokenService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.providers = this.route.snapshot.data['providers'];
    this.tokenService.storeProviderCount(this.providers.length);
  }

  public onPageChange(number: number): void {
    this.paginationConfig.currentPage = number;
  }

  public openConfirmDialog(dialog: any, provider: ConsentProvider): void {
    dialog.open();
    this.selectedProvider = provider;
  }

  public confirmDeleteProvider(dialog: any): void {
    dialog.close();
    if (this.selectedProvider != null) {
      this.providerService.deleteProvider(this.selectedProvider.id)
        .subscribe(
          () => {
            this.providers = this.providers.filter(p => p !== this.selectedProvider);
            this.tokenService.storeProviderCount(this.tokenService.getProviderCount() - 1);
            this.notificationService.i18nShow('NOTIFICATION_MSG.SUCCESS_DELETE_PROVIDER');
          },
          err => {
            this.notificationService.i18nShow('NOTIFICATION_MSG.FAILED_DELETE_PROVIDER');
            console.log(err);
          });
    }
  }

  public navigateToProviderSearch(): void {
    this.utilityService.navigateTo(this.apiUrlService.getProviderSearchUrl());
  }
}

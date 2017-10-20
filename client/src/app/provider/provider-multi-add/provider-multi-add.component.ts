import {Component, Input, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {NotificationService} from "../../core/notification.service";
import {FlattenedSmallProvider} from "c2s-ng-shared";
import {UtilityService} from "../../core/utility.service";
import {C2sUiApiUrlService} from "../../core/c2s-ui-api-url.service";

@Component({
  selector: 'c2s-provider-multi-add',
  templateUrl: './provider-multi-add.component.html',
  styleUrls: ['provider-multi-add.component.scss']
})
export class ProviderMultiAddComponent implements OnInit {
  @Input() providers: FlattenedSmallProvider[];
  currentProvider: FlattenedSmallProvider = null;

  constructor(private apiUrlService: C2sUiApiUrlService,
              private notificationService: NotificationService,
              private providerService: ProviderService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
  }

  public confirmAddProviders(dialog: any, selectedProviders: FlattenedSmallProvider[]): void {
    dialog.close();
    if (selectedProviders != null) {
      this.providerService.addProviders(selectedProviders)
        .subscribe(
          () => {
            this.utilityService.navigateTo(this.apiUrlService.getProviderListUrl());
          },
          err => {
            this.notificationService.i18nShow('NOTIFICATION_MSG.FAILED_ADD_PROVIDER');
            console.log(err);
          }
        );
    }
  }

  public confirmDeleteProvider(dialog: any, provider: FlattenedSmallProvider): void {
    dialog.close();
    if (provider != name) {
      this.currentProvider = provider;
      this.providers.splice(this.providers.indexOf(this.currentProvider), 1);
    }
  }
}

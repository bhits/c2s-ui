import {Component, OnInit, Input} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../core/notification.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

@Component({
  selector: 'c2s-provider-multi-add',
  templateUrl: './provider-multi-add.component.html',
  styleUrls: ['./provider-multi-add.component.css']
})
export class ProviderMultiAddComponent implements OnInit {
  @Input() providers: FlattenedSmallProvider[];
  currentProvider: FlattenedSmallProvider = null;

  constructor(private notificationService: NotificationService,
              private providerService: ProviderService,
              private router: Router) {
  }

  ngOnInit() {
  }

  confirmAddProviders(dialog: any, selectedProviders: FlattenedSmallProvider[]) {
    dialog.close();
    if (selectedProviders != null) {
      const PROVIDER_LIST_URL = "provider-list";
      this.providerService.addProviders(selectedProviders)
        .subscribe(
          () => {
            this.router.navigate([PROVIDER_LIST_URL]);
          },
          err => {
            this.notificationService.show("Failed to add the provider, please try again later...");
            console.log(err);
          }
        );
    }
  }

  confirmDeleteProvider(dialog: any, provider: FlattenedSmallProvider) {
    dialog.close();
    if (provider != name) {
      this.currentProvider = provider;
      this.providers.splice(this.providers.indexOf(this.currentProvider), 1);
    }
  }
}

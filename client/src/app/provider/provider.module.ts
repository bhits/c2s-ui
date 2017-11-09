import {NgModule} from "@angular/core";
import {SharedModule} from 'c2s-ng-shared';
import {ProviderService} from "./shared/provider.service";
import {ProviderSearchResultComponent} from "./provider-search-result/provider-search-result.component";
import {ProviderMultiAddComponent} from "./provider-multi-add/provider-multi-add.component";
import {providerRoutableComponents, providerRoutableResolves, ProviderRoutingModule} from "./provider-routing.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {Md2RootModule} from "md2";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  imports: [
    ProviderRoutingModule,
    SharedModule,
    Ng2PaginationModule,
    Md2RootModule,
    TranslateModule
  ],
  declarations: [
    ProviderSearchResultComponent,
    ProviderMultiAddComponent,
    providerRoutableComponents
  ],
  providers: [
    ProviderService,
    providerRoutableResolves
  ]
})
export class ProviderModule {
}


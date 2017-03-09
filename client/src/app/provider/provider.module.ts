import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ProviderService} from "./shared/provider.service";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {ProviderSearchResultComponent} from "./provider-search-result/provider-search-result.component";
import {ProviderMultiAddComponent} from "./provider-multi-add/provider-multi-add.component";
import {ProviderAddressPipe} from "./shared/provider-address.pipe";
import {ProviderProjectionNamePipe} from "./shared/provider-projection-name.pipe";
import {ProviderNamePipe} from "./shared/provider-name.pipe";
import {ProviderRoutingModule} from "./provider-routing.module";
import {ProviderListResolveService} from "./shared/provider-list-resolve.service";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    ProviderRoutingModule,
    RouterModule
  ],
  declarations: [
    ProviderListComponent,
    ProviderAddressPipe,
    ProviderSearchComponent,
    ProviderSearchResultComponent,
    ProviderMultiAddComponent,
    ProviderProjectionNamePipe,
    ProviderNamePipe
  ],
  providers: [
    ProviderService,
    ProviderListResolveService
  ]
})
export class ProviderModule {
}

import {NgModule} from "@angular/core";
import {ProviderRoutingModule} from "./provider-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ProviderService} from "./shared/provider.service";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {ProviderSearchResultComponent} from "./provider-search-result/provider-search-result.component";
import {ProviderMultiAddComponent} from "./provider-multi-add/provider-multi-add.component";
import {ProviderAddressPipe} from "./shared/provider-address.pipe";
import {ProviderNamePipe} from "./shared/provider-name.pipe";

@NgModule({
  imports: [
    ProviderRoutingModule,
    SharedModule
  ],
  declarations: [
    ProviderListComponent,
    ProviderAddressPipe,
    ProviderSearchComponent,
    ProviderSearchResultComponent,
    ProviderMultiAddComponent,
    ProviderNamePipe
  ],
  providers: [ProviderService]
})
export class ProviderModule {
}

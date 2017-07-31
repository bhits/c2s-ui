import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {SharedModule} from "../shared/shared.module";
import {ProviderService} from "./shared/provider.service";
import {ProviderSearchResultComponent} from "./provider-search-result/provider-search-result.component";
import {ProviderMultiAddComponent} from "./provider-multi-add/provider-multi-add.component";
import {ProviderAddressPipe} from "./shared/provider-address.pipe";
import {ProviderNamePipe} from "./shared/provider-name.pipe";
import {providerRoutableComponents, providerRoutableResolves, ProviderRoutingModule} from "./provider-routing.module";


@NgModule({
  imports: [
    ProviderRoutingModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ProviderAddressPipe,
    ProviderSearchResultComponent,
    ProviderMultiAddComponent,
    ProviderNamePipe,
    providerRoutableComponents
  ],
  providers: [
    ProviderService,
    providerRoutableResolves
  ]
})
export class ProviderModule {
}


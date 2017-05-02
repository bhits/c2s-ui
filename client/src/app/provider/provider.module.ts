import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TranslateModule} from '@ngx-translate/core';

import {SharedModule} from "../shared/shared.module";
import {ProviderService} from "./shared/provider.service";
import {ProviderSearchResultComponent} from "./provider-search-result/provider-search-result.component";
import {ProviderMultiAddComponent} from "./provider-multi-add/provider-multi-add.component";
import {ProviderAddressPipe} from "./shared/provider-address.pipe";
import {ProviderNamePipe} from "./shared/provider-name.pipe";
import {ProviderRoutingModule, providerRoutableComponents, providerRoutableResolves} from "./provider-routing.module";


@NgModule({
  imports: [
    ProviderRoutingModule,
    TranslateModule,
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


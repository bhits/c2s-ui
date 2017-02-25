import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {NgModule} from "@angular/core";
import {ProviderAddressPipe} from "./shared/provider-address.pipe";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderService} from "./shared/provider.service";
import {ProviderRoutingModule} from "./provider-routing.module";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ProviderRoutingModule,
    SharedModule
  ],
  declarations: [
    ProviderListComponent,
    ProviderAddressPipe,
    ProviderSearchComponent
  ],
  providers: [ProviderService]
})
export class ProviderModule {
}

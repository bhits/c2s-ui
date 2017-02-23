import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {NgModule} from "@angular/core";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderService} from "./shared/provider.service";
import {ProviderAddressPipe} from "./shared/provider-address.pipe";
import {SharedModule} from "../shared/shared.module";
import { ProviderSearchComponent } from './provider-search/provider-search.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [ProviderListComponent, ProviderAddressPipe, ProviderSearchComponent],
  providers: [ProviderService],
  exports: [
    ProviderListComponent,
    ProviderSearchComponent
  ]
})
export class ProviderModule {
}

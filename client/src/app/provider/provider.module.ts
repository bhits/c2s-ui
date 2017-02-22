import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {NgModule} from "@angular/core";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderService} from "./shared/provider.service";
import { ProviderAddressPipe } from './shared/provider-address.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ProviderListComponent, ProviderAddressPipe],
  providers: [ProviderService],
  exports: [
    ProviderListComponent
  ]
})
export class ProviderModule {
}

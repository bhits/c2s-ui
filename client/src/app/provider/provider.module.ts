import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {NgModule} from "@angular/core";
import {ProviderListComponent} from "./provider-list/provider-list.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ProviderListComponent],
  exports: [
    ProviderListComponent
  ]
})
export class ProviderModule {
}

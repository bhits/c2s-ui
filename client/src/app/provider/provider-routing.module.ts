import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {ConsentCardListComponent} from "../consent/consent-card-list/consent-card-list.component";

const providerRoutes: Routes = [
  {path: 'provider-list', component: ProviderListComponent},
  {path: 'provider-search', component: ProviderSearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(providerRoutes)
  ],
  exports: [RouterModule]
})
export class ProviderRoutingModule {
}

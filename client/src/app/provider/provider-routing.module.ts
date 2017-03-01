import {NgModule} from "@angular/core";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {RouterModule, Routes} from "@angular/router";

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

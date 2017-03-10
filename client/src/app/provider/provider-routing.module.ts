import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";

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

export const providerRoutableComponents = [
  ProviderListComponent,
  ProviderSearchComponent
]

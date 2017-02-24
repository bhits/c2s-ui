import {NgModule} from "@angular/core";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'provider-list', component: ProviderListComponent},
  {path: 'provider-search', component: ProviderSearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ProviderRoutingModule {
}

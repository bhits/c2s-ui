import {NgModule} from "@angular/core";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'providerSearch', component: ProviderSearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ProviderRoutingModule {
}

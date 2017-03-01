import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ProviderListComponent} from "./provider/provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider/provider-search/provider-search.component";
import {ConsentCreateEditComponent} from "./consent/consent-create-edit/consent-create-edit.component";

const routes: Routes = [
  {path: 'provider-list', component: ProviderListComponent},
  {path: 'provider-search', component: ProviderSearchComponent},
  {path: 'consent-create', component: ConsentCreateEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

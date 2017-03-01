import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ProviderListComponent} from "./provider/provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider/provider-search/provider-search.component";
import {ConsentCreateEditComponent} from "./consent/consent-create-edit/consent-create-edit.component";
import {HomeComponent} from "./home/home/home.component";

const appRoutes: Routes = [
  { path: '',   component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

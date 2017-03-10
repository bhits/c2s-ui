import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {ProviderListResolveService} from "./shared/provider-list-resolve.service";

const providerRoutes: Routes = [
  {
    path: 'provider-list',
    component: ProviderListComponent,
    resolve: {
      providers: ProviderListResolveService
    }
  },
  {
    path: 'provider-search',
    component: ProviderSearchComponent,
    resolve: {
      providers: ProviderListResolveService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(providerRoutes)
  ]
})
export class ProviderRoutingModule {
}

export const providerRoutableComponents = [
  ProviderListComponent,
  ProviderSearchComponent
];

export const providerRoutableResolves = [
  ProviderListResolveService
];

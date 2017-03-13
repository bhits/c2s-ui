import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";

const providerRoutes: Routes = [
  {
    path: 'provider-list',
    component: ProviderListComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
  },
  {
    path: 'provider-search',
    component: ProviderSearchComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
  }
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

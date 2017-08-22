import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProviderListComponent} from "./provider-list/provider-list.component";
import {ProviderSearchComponent} from "./provider-search/provider-search.component";
import {ProviderListResolveService} from "./shared/provider-list-resolve.service";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {ProvidersComponent} from "./providers/providers.component";

const providerRoutes: Routes = [
  {
    path: 'providers',
    component: ProvidersComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(providerRoutes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule {
}

export const providerRoutableComponents = [
  ProvidersComponent,
  ProviderListComponent,
  ProviderSearchComponent
];

export const providerRoutableResolves = [
  ProviderListResolveService
];

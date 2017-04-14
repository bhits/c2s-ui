import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {ProviderResolveService} from "../consent/shared/provider-resolve.service";
import {ConsentListResolveService} from "../consent/shared/consent-list-resolve.service";

const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    resolve: {
      providers: ProviderResolveService,
      consentList: ConsentListResolveService,
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

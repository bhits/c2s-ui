import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home/home.component";
import {PageNotFoundComponent} from "./security/page-not-found/page-not-found.component";
import {CanActivateAuthGuardService} from "./security/shared/can-activate-auth-guard.service";

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full' ,
    component: HomeComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
  },
  {
    path: '**',
    pathMatch: 'full' ,
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

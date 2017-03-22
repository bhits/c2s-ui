import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "../security/login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


const securityRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'page-not-found',
      component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(securityRoutes)
  ],
  declarations: []
})
export class SecurityRoutingModule { }


export const securityRoutableComponents = [
  LoginComponent,
  PageNotFoundComponent
]

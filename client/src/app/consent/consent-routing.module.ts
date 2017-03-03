import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";

import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {ConsentResolveService} from "./shared/consent-resolve.service";
import {ProviderResolveService} from "./shared/provider-resolve.service";


const consentRoutes: Routes = [
  { path: 'consent-list', component: ConsentCreateEditComponent },
  { path: 'consent-create-edit',
    component: ConsentCreateEditComponent,
    resolve: {
      providers:ProviderResolveService
    }
  },
  { path: 'consent-create-edit/:consentId',
    component: ConsentCreateEditComponent,
    resolve: {
      consent: ConsentResolveService,
      providers:ProviderResolveService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(consentRoutes)
  ],
  declarations: []
})
export class ConsentRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";

import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";


const consentRoutes: Routes = [
  {path: 'consent-list', component: ConsentCreateEditComponent },
  {path: 'consent-create-edit', component: ConsentCreateEditComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(consentRoutes)
  ],
  declarations: []
})
export class ConsentRoutingModule { }

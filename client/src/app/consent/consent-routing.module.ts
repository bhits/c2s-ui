import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";


const consentRoutes: Routes = [
  {path: 'consent-list', component: ConsentCardListComponent},
  {path: 'consent-create-edit', component: ConsentCreateEditComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(consentRoutes)
  ],
  declarations: []
})
export class ConsentRoutingModule {
}

import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";

const homeRoutes: Routes = [
  { path: '',   component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(homeRoutes)
  ],
  declarations: [RouterModule]
})
export class HomeRoutingModule { }

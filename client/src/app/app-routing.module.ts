import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home/home.component";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full' , component: HomeComponent},
  { path: '**', pathMatch: 'full' , component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

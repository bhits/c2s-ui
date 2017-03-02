import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../shared/shared.module";
import {HomeService} from "./shared/home.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule {
}

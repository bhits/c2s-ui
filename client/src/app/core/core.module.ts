import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Http, XHRBackend, RequestOptions} from "@angular/http";
import {SlimLoadingBarService, SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {ExceptionService} from "./exception.service";
import {httpInterceptorServiceFactory} from "./http-interceptor.service";

@NgModule({
  imports: [
    CommonModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [],
  providers: [
    ExceptionService,
    {
      provide: Http,
      useFactory: httpInterceptorServiceFactory,
      deps: [XHRBackend, RequestOptions, SlimLoadingBarService]
    }
  ],
  exports: [SlimLoadingBarModule]
})
export class CoreModule {
}



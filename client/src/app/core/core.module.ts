import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Http, XHRBackend, RequestOptions} from "@angular/http";
import {SlimLoadingBarService, SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {httpInterceptorServiceFactory} from "./http-interceptor.service";
import {NotificationService} from "./notification.service";
import {ExceptionService} from "./exception.service";
import {SecurityModule} from "../security/security.module";
import {TokenService} from "../security/shared/token.service";

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [],
  providers: [
    ExceptionService,
    NotificationService,
    {
      provide: Http,
      useFactory: httpInterceptorServiceFactory,
      deps: [XHRBackend, RequestOptions, SlimLoadingBarService, TokenService]
    }
  ],
  exports: [SlimLoadingBarModule]
})
export class CoreModule {
}



import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {SlimLoadingBarModule, SlimLoadingBarService} from "ng2-slim-loading-bar";
import {httpInterceptorServiceFactory} from "./http-interceptor.service";
import {NotificationService} from "./notification.service";
import {ExceptionService} from "./exception.service";
import {SecurityModule} from "../security/security.module";
import {TokenService} from "../security/shared/token.service";
import {GlobalEventManagerService} from "./global-event-manager.service";
import {BrowserService} from "./browser.service";
import {CustomTranslateService} from "./custom-translate.service";
import {SessionStorageService} from "../security/shared/session-storage.service";
import {ConfigService} from "./config.service";
import {UtilityService} from "./utility.service";
import {DataService} from "./data.service";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";
import {Md2RootModule} from "md2";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    Md2RootModule,
    SecurityModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [],
  providers: [
    ConfigService,
    BrowserService,
    ExceptionService,
    NotificationService,
    GlobalEventManagerService,
    CustomTranslateService,
    UtilityService,
    DataService,
    C2sUiApiUrlService,
    {
      provide: Http,
      useFactory: httpInterceptorServiceFactory,
      deps: [XHRBackend, RequestOptions, SlimLoadingBarService, TokenService, SessionStorageService]
    }
  ],
  exports: [SlimLoadingBarModule]
})
export class CoreModule {
}



import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {Md2Module} from "md2";
import {MaterialModule} from "@angular/material";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {ConsentModule} from "./consent/consent.module";
import {ProviderModule} from "./provider/provider.module";
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {CanActivateAuthGuardService} from "./security/shared/can-activate-auth-guard.service";
import {AuthenticationService} from "./security/shared/authentication.service";
import {GlobalEventManagerService} from "./core/global-event-manager.service";
import {LayoutModule} from "./layout/layout.module";
import {AccountModule} from "./account/account.module";
import {CustomTranslateService} from "./core/custom-translate.service";
import {UploadDocumentsModule} from "./upload-documents/upload-documents.module";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    //3rd Party modules
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Md2Module,
    MaterialModule, // TODO: Move to core module - verify why it is not working now.
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    // C2S Modules
    AccountModule,
    CoreModule,
    LayoutModule,
    HomeModule,
    ConsentModule,
    ProviderModule,
    UploadDocumentsModule,
    AppRoutingModule // Must be the last module to be imported
  ],
  providers: [
    CanActivateAuthGuardService,
    AuthenticationService,
    GlobalEventManagerService,
    TranslateService,
    CustomTranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

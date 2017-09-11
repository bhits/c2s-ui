import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {Http} from "@angular/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
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
import {createTranslateLoader, CustomTranslateService} from "./core/custom-translate.service";
import {MedicalDocumentsModule} from "./medical-documents/medical-documents.module";
import {UserProfileModule} from "./user-profile/user-profile.module";
import {UserAvatarModule} from "./user-avatar/user-avatar.module";
import {UserAvatarMonitoringService} from "./shared/user-avatar-monitoring.service";
import {ActivityModule} from "./activity/activity.module";
import {HealthInformationModule} from "./health-information/health-information.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserAnimationsModule,
    BrowserModule,

    //3rd Party modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    // C2S Modules
    AccountModule,
    ActivityModule,
    CoreModule,
    LayoutModule,
    HomeModule,
    ConsentModule,
    ProviderModule,
    MedicalDocumentsModule,
    HealthInformationModule,
    UserProfileModule,
    UserAvatarModule,
    AppRoutingModule // Must be the last module to be imported
  ],
  providers: [
    CanActivateAuthGuardService,
    AuthenticationService,
    GlobalEventManagerService,
    TranslateService,
    CustomTranslateService,
    UserAvatarMonitoringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

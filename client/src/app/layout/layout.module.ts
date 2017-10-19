import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderUserProfileComponent} from "./header-user-profile/header-user-profile.component";
import {LogoComponent} from "./logo/logo.component";
import {MenuComponent} from "./menu/menu.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {PageContentComponent} from "./page-content/page-content.component";
import {SharedModule} from 'c2s-ng-shared';
import {RouterModule} from "@angular/router";
import {AuthenticationService} from "../security/shared/authentication.service";
import {UnsecuredHeaderComponent} from "./unsecured-header/unsecured-header.component";
import {MultiLanguageComponent} from "./multi-language/multi-language.component";
import {UserAvatarModule} from "../user-avatar/user-avatar.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserAvatarModule,
    TranslateModule
  ],
  declarations: [
    HeaderUserProfileComponent,
    LogoComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    PageContentComponent,
    UnsecuredHeaderComponent,
    MultiLanguageComponent],
  exports: [
    HeaderComponent,
    UnsecuredHeaderComponent,
    FooterComponent,
    PageContentComponent
  ],
  providers: [AuthenticationService]
})
export class LayoutModule {
}

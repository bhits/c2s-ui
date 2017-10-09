import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {HeaderUserProfileComponent} from "./header-user-profile/header-user-profile.component";
import {LogoComponent} from "./logo/logo.component";
import {MenuComponent} from "./menu/menu.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {PageContentComponent} from "./page-content/page-content.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {AuthenticationService} from "../security/shared/authentication.service";
import {UnsecuredHeaderComponent} from "./unsecured-header/unsecured-header.component";
import {MultiLanguageComponent} from "./multi-language/multi-language.component";
import {UserAvatarModule} from "../user-avatar/user-avatar.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserAvatarModule
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
    PageContentComponent,
    MaterialModule
  ],
  providers: [AuthenticationService]
})
export class LayoutModule {
}

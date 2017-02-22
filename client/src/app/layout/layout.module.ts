import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserProfileComponent, LogoComponent, MenuComponent, HeaderComponent, FooterComponent]
})
export class LayoutModule { }

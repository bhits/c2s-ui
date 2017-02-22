import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserProfileComponent, LogoComponent, MenuComponent]
})
export class LayoutModule { }

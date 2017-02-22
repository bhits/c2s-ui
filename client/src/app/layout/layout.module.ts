import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserProfileComponent, LogoComponent]
})
export class LayoutModule { }

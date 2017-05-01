import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UmsProfile} from "../security/shared/ums-profile.model";
import {ProfileService} from "../security/shared/profile.service";

@Injectable()
export class CustomTranslateService {

  constructor( private translateService: TranslateService, private profileService: ProfileService) {
  }

  getCurrentLanguage():string{
     return this.translateService.currentLang;
  }

  addSupportedLanguages(locales: string[]){
    this.translateService.addLangs(locales);
  }

  setDefaultLanguage(locale:string){
    this.updateProfileLocale(locale);
    this.translateService.use(locale);
  }

  private updateProfileLocale(locale:string){
    let profile: UmsProfile = this.profileService.getProfileFromSessionStorage();
    if(profile){
      profile.userLocale = locale;
      this.profileService.setProfileInSessionStorage(profile);
    }
  }

  getSupportedLanguages(): string[]{
    return this.translateService.getLangs();
  }
}

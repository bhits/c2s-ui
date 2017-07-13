import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UmsLimitedProfile} from "../security/shared/ums-limited-profile.model";
import {LimitedProfileService} from "../security/shared/limited-profile.service";
import {Http} from "@angular/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {ExceptionService} from "./exception.service";
import {C2sUiApiUrlService} from "../shared/c2s-ui-api-url.service";

@Injectable()
export class CustomTranslateService {
  private umsProfileUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl().concat("/users/locale");

  constructor( private translateService: TranslateService,
               private limitedProfileService: LimitedProfileService,
               private http: Http,
               private c2sUiApiUrlService: C2sUiApiUrlService,
               private exceptionService: ExceptionService,) {
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

  updateDefaultLanguage(){
    // Will dynamically set the selected locale in the headers
    this.http.put(this.umsProfileUrl, {})
      .map(() => null)
      .subscribe(
        (response) =>{
        },
        (error) => {
          this.exceptionService.handleError
        }
      );
  }

  private updateProfileLocale(locale:string){
    let profile: UmsLimitedProfile = this.limitedProfileService.getProfileFromSessionStorage();
    if(profile){
      profile.userLocale = locale;
      this.limitedProfileService.setProfileInSessionStorage(profile);
    }
  }

  getSupportedLanguages(): any[]{
    return this.limitedProfileService.getProfileFromSessionStorage().supportedLocales;
  }
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

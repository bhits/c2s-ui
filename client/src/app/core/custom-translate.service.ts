import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Locale} from "./shared/locale.model";
import {UmsProfile} from "../security/shared/ums-profile.model";

@Injectable()
export class CustomTranslateService {

  constructor( private translateService: TranslateService) {
  }

  getCurrentLanguage():string{
     return this.translateService.currentLang;
  }

  addSupportedLanguages(locales: string[]){
    this.translateService.addLangs(locales);
  }

  setDefaultLanguage(locale:string){
    this.translateService.use(locale);
  }

  getSupportedLanguages(): string[]{
    return this.translateService.getLangs();
  }

}

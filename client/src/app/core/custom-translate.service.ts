import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Locale} from "./shared/locale.model";

@Injectable()
export class CustomTranslateService {

  constructor( private translate: TranslateService) {

  }

  getCurrentLanguage():string{
     return this.translate.currentLang;
  }

  enableDefaultLanguage(){
    let languages:string [] = [Locale.ENGLISH, Locale.SPANISH];
    this.translate.addLangs(languages);
    // // TODO Get default langauge from user profile
    this.translate.use(languages[0]);

  }

  setDefaultLanguage(locale:string){
    this.translate.use(locale);
  }

  getSupportedLanguages(): string[]{
    return this.translate.getLangs();
  }

}

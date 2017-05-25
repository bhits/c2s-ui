import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Md2Toast} from "md2";

@Injectable()
export class NotificationService {
  private duration: number = 2000;

  constructor(private toast: Md2Toast, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }

  show(message:string){
    this.toast.show(message, this.duration);
  }

  i18nShow(key:string){
    this.translate.get(key).subscribe((res: string) => {
      this.toast.show(res, this.duration);
    });
  }

}

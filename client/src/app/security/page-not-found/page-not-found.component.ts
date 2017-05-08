import {Component, OnInit} from "@angular/core";
import {SessionStorageService} from "src/app/security/shared/session-storage.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  private USER_PREFERRED_LOCALE_KEY: string = 'user-preferred-locale';

  constructor(private sessionStorageService: SessionStorageService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.getUserPreferredLocale() != null) {
      this.translate.setDefaultLang(this.getUserPreferredLocale());
    } else {
      //Set default locale to be English if there is no default locale provided.
      this.translate.setDefaultLang("en");
    }
  }

  private getUserPreferredLocale(): string {
    return this.sessionStorageService.getItemFromSessionStorage(this.USER_PREFERRED_LOCALE_KEY);
  }
}

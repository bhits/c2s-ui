import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.scss']
})
export class MultiLanguageComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  setLocale(locale:string){
    this.translate.use(locale);
  }
}

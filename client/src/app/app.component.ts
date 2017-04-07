import {Component, OnInit} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private lang:string[] = ["en", "es"];

  constructor(private translate: TranslateService){
    this.translate.addLangs(this.lang);
    // TODO Get default langauge from user profile
    this.translate.setDefaultLang(this.lang[0]);
  }

  ngOnInit() {
  }
}



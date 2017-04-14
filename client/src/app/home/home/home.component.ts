import {Component, OnInit} from "@angular/core";
import {DataService} from "../../shared/data.service";
import {UtilityService} from "../../shared/utility.service";
import {HomeCard} from "../shared/home-card.model";
import {ActivatedRoute} from "@angular/router";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {ConsentList} from "../../consent/shared/consent-list.model";

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  totalProviders: number = 0;
  totalConsents: number = 0;
  providers: ConsentProvider[];
  consentList: ConsentList;
  isDisabled: boolean = false;
  consentMapping:any;
  providerMapping:any;

  constructor(private dataService: DataService,
              private utilityService: UtilityService,
              private translate: TranslateService,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.consentMapping = {
      '=0': 'HOME.CONSENTS.ZERO',
      'other': 'HOME.CONSENTS.MORE'
    };

    this.providerMapping = {
      '=0': 'HOME.PROVIDERS.ZERO',
      'other': 'HOME.PROVIDERS.MORE'
    };

    this.providers = this.route.snapshot.data['providers'];
    if(this.providers){
      this.totalProviders = this.providers.length;
    }

    this.consentList = this.route.snapshot.data['consentList'];
    if(this.consentList){
      this.totalConsents = this.consentList.totalElements;
      this.isDisabled = this.totalProviders <= 1 ? true: false;
    }
  }

  navigateTo(url: string) {
    this.utilityService.navigateTo(url);
  }



  onClick(isDisabled: boolean, dialog:any ){
    if(isDisabled){
      dialog.open();
    }else{
      this.navigateTo('consent-list');
    }
  }

}

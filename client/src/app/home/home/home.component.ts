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
  homeCards:HomeCard[] = [];
  providers: ConsentProvider[];
  consentList: ConsentList;

  constructor(private dataService: DataService,
              private utilityService: UtilityService,
              private translate: TranslateService,
              private route: ActivatedRoute,) {
    this.prepareHomeCards();
  }

  ngOnInit() {
    this.providers = this.route.snapshot.data['providers'];
    if(this.providers){
      this.totalProviders = this.providers.length;
      this.homeCards[0]['imageUrl'] = (this.totalProviders === 0)? "assets/img/addProviders.svg" : "assets/img/contacts.svg";
      this.homeCards[0]['entityCount']= this.totalProviders;
      this.homeCards[0]['headerClass']= 'contacts';
    }

    this.consentList = this.route.snapshot.data['consentList'];
    if(this.consentList){
      this.totalConsents = this.consentList.totalElements;
      this.homeCards[1]['entityCount']= this.totalConsents;
      this.homeCards[1]['headerClass']= this.totalProviders <= 1 ? 'disabled': 'consents';
    }
  }

  navigateTo(url: string) {
    this.utilityService.navigateTo(url);
  }
  consentMapping: any = {
    '=0': 'HOME.CONSENTS.ZERO',
    'other': 'HOME.CONSENTS.MORE'
  };

  providerMapping: any = {
    '=0': 'HOME.PROVIDERS.ZERO',
    'other': 'HOME.PROVIDERS.MORE'
  }

  prepareHomeCards(){
    let providersCard: HomeCard = new HomeCard(
      'provider-list',
      'assets/img/contacts.svg',
      'Providers',
      'Step 1.',
      'Begin by adding the people with whom you trust to share your health information.'
    );
    let consentsCard = new HomeCard(
      'consent-list',
      'assets/img/consents.svg',
      'Consents',
      'Step 2.',
      'Next, create a consent to allow your providers and/or contacts to share health information.'
    );

    this.homeCards = [providersCard,consentsCard];
  }

  onClick(cardState: string, dialog:any ){
    if(cardState === 'disabled'){
      dialog.open();
    }
  }

}

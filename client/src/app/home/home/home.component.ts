import {Component, OnInit} from "@angular/core";
import {DataService} from "../../shared/data.service";
import {UtilityService} from "../../shared/utility.service";
import {HomeCard} from "../shared/home-card.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  private totalProviders: number = 0;
  private totalConsents: number = 0;
  private homeCards:HomeCard[] = [];

  constructor(private dataService: DataService,
              private utilityService: UtilityService,
              private route: ActivatedRoute,) {

    this.homeCards = [
      new HomeCard(
        'provider-list',
        'assets/img/contacts.svg',
        'Providers',
        'Step 1.',
        'Begin by adding the people with whom you trust to share your health information.'
      ),
      new HomeCard(
        'consent-list',
        'assets/img/consents.svg',
        'Consents',
        'Step 2.',
        'Next, create a consent to allow your providers and/or contacts to share health information.'
      )
    ];

    this.dataService.getProviders()
          .subscribe(
            res => {
              this.totalProviders = res.length;
              this.homeCards[0]['imageUrl'] = (res.length === 0)? "assets/img/addProviders.svg" : "assets/img/contacts.svg";
              this.homeCards[0]['entityCount']= res.length;
              this.homeCards[0]['headerClass']= 'contacts';
            },
            err => console.log(err)
          );
    this.dataService.getConsents(0)
        .subscribe(
          consentList => {
            this.totalConsents = consentList.totalElements;
            this.homeCards[1]['entityCount']= consentList.totalElements;
            this.homeCards[1]['headerClass']= this.totalProviders === 0 ? 'disabled': 'consents';
          },
            err => console.log(err)
          );
  }

  ngOnInit() {

  }

  navigateTo(url: string) {
    this.utilityService.navigateTo(url);
  }
}

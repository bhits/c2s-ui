import {Component, OnInit} from "@angular/core";
import {DataService} from "../../shared/data.service";
import {UtilityService} from "../../shared/utility.service";

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  private providerTranslateParam: any = {value:''} ;
  private consentTransalteParam: any = {value:''};
  private totalProviders: number = 0;
  private totalConsents: number = 0;

  constructor(private dataService: DataService,
              private utilityService: UtilityService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.dataService.getProviders()
      .subscribe(
        res => {
          this.totalProviders = res.length;
          this.providerTranslateParam.value = res.length > 1 ? 's' : ''
        },
        err => console.log(err)
      );
    this.dataService.getConsents(0)
      .subscribe(
        consentList => {
          this.totalConsents = consentList.totalElements;
          this.consentTransalteParam.value = consentList.totalElements > 1 ? 's' : ''
        },
        err => console.log(err))
    ;
  }

  navigateTo(url: string) {
    this.utilityService.navigateTo(url);
  }
}

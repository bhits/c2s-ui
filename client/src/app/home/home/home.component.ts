import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {HomeService} from "../shared/home.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalProviders: number = 0;

  constructor(private homeService: HomeService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.homeService.getProviders()
      .filter(res => res.length > 0)
      .subscribe(res => {
        this.totalProviders = res.length;
      });
  }

  navigateTo(url: string) {
    this.utilityService.navigateTo(url);
  }
}

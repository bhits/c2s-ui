import {Component, OnInit, Input} from '@angular/core';
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {
  @Input() private routeUrl:string;
  @Input() private imageUrl:string;
  @Input() private title:string;
  @Input() private step:string;
  @Input() private description:string;
  @Input() private entityCount:number;
  @Input() private headerClass:string;


  constructor(private utilityService: UtilityService) { }

  ngOnInit() {


  }

  navigateTo(url: string) {
    if(this.headerClass && this.headerClass === 'disabled'){
      console.log("Cannot create consent.!!");
    }else{
      this.utilityService.navigateTo(url);
    }

  }
}

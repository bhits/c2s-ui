import { Component, OnInit } from '@angular/core';
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
  }

  navigateTo(url:string){
    this.utilityService.navigateTo(url);
  }
}

import { Component, OnInit } from '@angular/core';
import {UtiltityService} from "../../shared/utiltity.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private utiltityService:UtiltityService) { }

  ngOnInit() {
  }

  navigateTo(url:string){
    this.utiltityService.navigateTo(url);
  }
}

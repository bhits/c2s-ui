import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from "../../core/global-event-manager.service";

@Component({
  selector: 'c2s-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit {
  showFooter: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  getFullYear():number{
    return (new Date()).getFullYear();
  }

}

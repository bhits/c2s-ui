import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from "../../security/shared/global-event-manager.service";

@Component({
  selector: 'c2s-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = false;

  constructor(private globalEventManagerService: GlobalEventManagerService) {
    this.globalEventManagerService.showHeaderAndFooterEmitter.subscribe((showHeader)=>{
      if (showHeader !== null) {
        this.showHeader = showHeader;
      }
    });
  }

  ngOnInit() {
  }

}

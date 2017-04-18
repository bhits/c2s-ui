import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from "../../core/global-event-manager.service";


@Component({
  selector: 'c2s-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = false;

  constructor(private globalEventManagerService: GlobalEventManagerService) {
    this.globalEventManagerService.getShowHEaderEmitter().subscribe((showHeader)=>{
      if (showHeader !== null) {
        this.showHeader = showHeader;
      }
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from "../../security/shared/global-event-manager.service";

@Component({
  selector: 'c2s-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  showFooter: boolean = false;

  constructor(private globalEventManagerService: GlobalEventManagerService) {
    this.globalEventManagerService.showHeaderAndFooterEmitter.subscribe((showFooter)=>{
      if (showFooter !== null) {
        this.showFooter = showFooter;
      }
    });
  }

  ngOnInit() {
  }

}

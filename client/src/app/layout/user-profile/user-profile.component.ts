import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {Profile} from "../../core/profile.model";

@Component({
  selector: 'c2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile: Profile;

  constructor(private globalEventManagerService: GlobalEventManagerService) {
    this.globalEventManagerService.getUserProfileEmitter().subscribe((profile)=>{
      if (profile) {
        this.profile = profile;
      }
    });
  }

  ngOnInit() {
  }
}

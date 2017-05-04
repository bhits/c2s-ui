import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {Profile} from "../../core/profile.model";
import {ProfileService} from "../../security/shared/profile.service";

@Component({
  selector: 'c2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userName: String;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.userName = this.profileService.getFullName();
  }
}

import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../security/shared/profile.service";

@Component({
  selector: 'c2s-header-user-profile',
  templateUrl: './header-user-profile.component.html',
  styleUrls: ['header-user-profile.component.scss']
})
export class HeaderUserProfileComponent implements OnInit {

  userName: String;

    constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.userName = this.profileService.getFullName();
  }
}

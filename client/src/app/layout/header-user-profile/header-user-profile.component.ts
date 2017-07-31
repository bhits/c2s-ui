import {Component, OnInit} from '@angular/core';
import {LimitedProfileService} from "../../security/shared/limited-profile.service";

@Component({
  selector: 'c2s-header-user-profile',
  templateUrl: './header-user-profile.component.html',
  styleUrls: ['header-user-profile.component.scss']
})
export class HeaderUserProfileComponent implements OnInit {
  userName: String;

  constructor(private limitedProfileService: LimitedProfileService) {
  }

  ngOnInit() {
    this.userName = this.limitedProfileService.getFullName();
  }
}

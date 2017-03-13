import {Component, OnInit} from '@angular/core';

import {AuthenticationService} from "./security/shared/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin:boolean = false;

  constructor(private authenticationService:AuthenticationService){
  }

  ngOnInit() {
    this.isLogin = this.authenticationService.isLoggedIn;
  }
}



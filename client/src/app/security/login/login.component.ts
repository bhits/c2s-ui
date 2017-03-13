import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'c2s-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  login(){
    this.authenticationService.login();
  }
}

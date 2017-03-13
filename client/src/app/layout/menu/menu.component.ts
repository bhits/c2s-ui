import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {AuthenticationService} from "../../security/shared/authentication.service";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private utilityService: UtilityService, private authenticationService:AuthenticationService) {
  }

  ngOnInit() {
  }

  navigateTo(url: string, name:string) {
    if(name==='Logout'){
      this.authenticationService.logout();
    }else{
      this.utilityService.navigateTo(url);
    }

  }

  menuItems = [
    {name: 'Home', url: ''},
    {name: 'Providers', url: 'provider-list'},
    {name: 'Consents', url: 'consent-list'},
    {name: 'Medical Documents', url: ''},
    {name: 'Activity History', url: ''},
    {name: 'Health Information', url: ''},
    {name: 'Resources', url: ''},
    {name: 'Logout', url: ''}
  ];
}

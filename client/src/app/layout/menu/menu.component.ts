import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {MenuItems} from "../shared/menu-items.model";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private menuItems: MenuItems[];

  constructor(private utilityService: UtilityService, private authenticationService:AuthenticationService) {
  }

  ngOnInit() {
    this.menuItems = [
      new MenuItems('Home', ''),
      new MenuItems('Providers', 'provider-list'),
      new MenuItems('Consents', 'consent-list'),
      new MenuItems('Medical Documents', ''),
      new MenuItems('Activity History', ''),
      new MenuItems('Health Information', ''),
      new MenuItems('Resources', ''),
      new MenuItems('Logout', '')
    ];
  }

  navigateTo(url: string, name:string) {
    if (name === 'Logout') {
      this.authenticationService.logout();
    } else {
      this.utilityService.navigateTo(url);
    }
  }
}

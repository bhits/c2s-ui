import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {MenuItems} from "../shared/menu-items.model";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItems[];

  constructor(private utilityService: UtilityService, private authenticationService:AuthenticationService) {
  }

  ngOnInit() {
    this.menuItems = [
      new MenuItems('Home', '', 'HOME.MENU.MENU_ITEM.HOME'),
      new MenuItems('Providers', 'provider-list','HOME.MENU.MENU_ITEM.PROVIDERS'),
      new MenuItems('Consents', 'consent-list','HOME.MENU.MENU_ITEM.CONSENTS'),
      new MenuItems('Logout', '','HOME.MENU.MENU_ITEM.LOGOUT')
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

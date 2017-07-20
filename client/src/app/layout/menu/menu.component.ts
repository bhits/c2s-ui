import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {MenuItem} from "../shared/menu-item.model";
import {MENU_ITEMS} from "../shared/menu-items.model";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuItems: MenuItem[];

  constructor(private utilityService: UtilityService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.menuItems = MENU_ITEMS;
  }

  public navigateTo(key: string, routerLink: string): void {
    switch (key) {
      case 'Logout':
        this.authenticationService.logout();
        break;
      default:
        this.utilityService.navigateTo(routerLink);
    }
  }
}

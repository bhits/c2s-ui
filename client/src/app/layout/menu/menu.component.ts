import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../core/utility.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {MenuItem} from "../shared/menu-item.model";
import {MENU_ITEMS} from "../shared/menu-items.model";
import {ConfigService} from "../../core/config.service";
import {MenuItemKey} from "../shared/menu-item-key";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit {
  private isHealthInformationEnabled: boolean;

  public menuItems: MenuItem[];

  constructor(private utilityService: UtilityService,
              private authenticationService: AuthenticationService,
              private configService: ConfigService) {
  }

  ngOnInit() {
    let config: any = this.configService.getConfigInSessionStorage();
    if (config) {
      this.isHealthInformationEnabled = config.features.healthInformationEnabled;
    } else {
      console.log("Cannot get config from session")
    }
  }

  public getEnabledMenuItems(): MenuItem[] {
    return MENU_ITEMS.filter(menuItem => this.isShowInMenu(menuItem));
  }

  private isShowInMenu(menuItem: MenuItem): boolean {
    switch (menuItem.key) {
      case MenuItemKey.HEALTH_INFORMATION:
        return this.isHealthInformationEnabled;
      default:
        return true;
    }
  }

  public navigateTo(key: string, routerLink: string): void {
    switch (key) {
      case MenuItemKey.LOGOUT:
        this.authenticationService.logout();
        break;
      default:
        this.utilityService.navigateTo(routerLink);
    }
  }
}

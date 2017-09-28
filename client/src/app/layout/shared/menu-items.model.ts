import {MenuItem} from "./menu-item.model";
import {MenuItemKey} from "./menu-item-key";

export const MENU_ITEMS: MenuItem[] = [
  new MenuItem(MenuItemKey.HOME, 'home', 'HOME.MENU.MENU_ITEM.HOME'),
  new MenuItem(MenuItemKey.ACTIVITY_HISTORY, 'activities/consent-activity', 'HOME.MENU.MENU_ITEM.ACTIVITY_HISTORY'),
  new MenuItem(MenuItemKey.PROVIDERS, 'providers', 'HOME.MENU.MENU_ITEM.PROVIDERS'),
  new MenuItem(MenuItemKey.CONSENTS, 'consents', 'HOME.MENU.MENU_ITEM.CONSENTS'),
  new MenuItem(MenuItemKey.MEDICAL_DOCUMENTS, 'medical-documents', 'HOME.MENU.MENU_ITEM.MEDICAL_DOCUMENTS'),
  new MenuItem(MenuItemKey.HEALTH_INFORMATION, 'health-information', 'HOME.MENU.MENU_ITEM.HEALTH_INFORMATION'),
  new MenuItem(MenuItemKey.MY_PROFILE, 'user-profile', 'HOME.MENU.MENU_ITEM.MY_PROFILE'),
  new MenuItem(MenuItemKey.LOGOUT, '', 'HOME.MENU.MENU_ITEM.LOGOUT')
];

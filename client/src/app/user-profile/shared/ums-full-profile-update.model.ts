import {UmsFullProfileView} from "./ums-full-profile-view.model";
import {UmsProfileAddress} from "../../shared/ums-profile-address.model";

export class UmsFullProfileUpdate {
  constructor(umsFullProfileView?: UmsFullProfileView) {
    if(umsFullProfileView){
      this.userLocale = umsFullProfileView.userLocale;
      this.homeAddress = umsFullProfileView.homeAddress;
      this.homeEmail = umsFullProfileView.homeEmail;
      this.homePhone = umsFullProfileView.homePhone;
    }
  }

  userLocale: string;
  homeAddress: UmsProfileAddress;
  homeEmail: string;
  homePhone: string;
}

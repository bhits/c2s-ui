import {Address} from "../../shared/address.model";
import {UmsFullProfileView} from "./ums-full-profile-view.model";

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
  homeAddress: Address;
  homeEmail: string;
  homePhone: string;
}

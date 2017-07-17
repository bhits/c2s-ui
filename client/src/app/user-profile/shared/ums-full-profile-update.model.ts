import {UmsFullProfileView} from "./ums-full-profile-view.model";
import {UmsProfileAddress} from "../../shared/ums-profile-address.model";

export class UmsFullProfileUpdate {
  constructor(umsFullProfileView?: UmsFullProfileView) {
    if(umsFullProfileView){
      this.homeAddress = umsFullProfileView.homeAddress;
      this.homeEmail = umsFullProfileView.homeEmail;
      this.homePhone = umsFullProfileView.homePhone;
    }
  }

  homeAddress: UmsProfileAddress;
  homeEmail: string;
  homePhone: string;
}

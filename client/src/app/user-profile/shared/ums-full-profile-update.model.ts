import {UmsFullProfileView} from "./ums-full-profile-view.model";
import {UmsProfileAddress} from "c2s-ng-shared";

export class UmsFullProfileUpdate {
  constructor(umsFullProfileView?: UmsFullProfileView) {
    if (umsFullProfileView) {
      this.homeAddress = umsFullProfileView.homeAddress;
      this.homeEmail = umsFullProfileView.homeEmail;
      this.homePhone = umsFullProfileView.homePhone;
    }
  }

  homeAddress: UmsProfileAddress;
  homeEmail: string;
  homePhone: string;
}

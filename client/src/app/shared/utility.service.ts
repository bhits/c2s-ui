import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class UtilityService {

  constructor(private router: Router) {
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}

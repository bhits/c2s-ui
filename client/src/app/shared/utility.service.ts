import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Injectable()
export class UtilityService {

  constructor(private router: Router, private datePipe: DatePipe) {
  }

  navigateToWithParameters(url: string, params: any) {
    this.router.navigate([url, params]);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  removeAll(entries: any[]) {
    entries.splice(0, entries.length);
  }

  formatDate(dateStr: string, dateFormat: string) {
    return this.datePipe.transform(dateStr, dateFormat);
  }

  isDefined(entity: any): boolean {
    return (typeof entity !== 'undefined')
  }

  formatZipCode(zipCode: string): string {
    if (zipCode.length > 5) {
      zipCode = zipCode.slice(0, 5) + "-" + zipCode.slice(5);
    }
    return zipCode;
  }
}

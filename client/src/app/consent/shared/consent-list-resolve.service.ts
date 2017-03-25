import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {ConsentList} from "./consent-list.model";

@Injectable()
export class ConsentListResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.getConsents(0)
      .do((consentList: ConsentList) => {
        return consentList;
      });
  }
}

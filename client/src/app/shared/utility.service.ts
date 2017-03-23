import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Identifier} from "./identifier.model";

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

  convertJsonObjToStrMap(jsonStr) {
    const strMap = new Map();
    for (let k of Object.keys(jsonStr)) {
      strMap.set(k, jsonStr[k]);
    }
    return strMap;
  }

  dateStrToLocalDate(dateStr:string):string[]{
    if(dateStr){
      let dateArray = (this.formatDate(dateStr, 'MM/dd/yyyy')).split('/');
      if(!isNaN(parseInt(dateArray[0])) && !isNaN(parseInt(dateArray[1])) && !isNaN(parseInt(dateArray[2]))){
        return [dateArray[2], dateArray[0], dateArray[1] ];
      }
    }
    return [];
  }

  localDateToDateStr(localDate:string):string{
    if(localDate && localDate.length >0){
      let dateStr = this.formatDate(localDate,"MM/dd/yyyy");
      if(!isNaN(parseInt(localDate[0])) && !isNaN(parseInt(localDate[1])) && !isNaN(parseInt(localDate[2]))){
        return localDate[0].concat("/").concat(localDate[1]).concat(localDate[2]);
      }
    }
    return "";
  }

  createIdentifiers(entities:any):Identifier[]{
    let identifiers: Identifier[] = [];
    entities.forEach(entity => {
      if(entity['value'] && entity['system']){
        identifiers.push(new Identifier(entity['value'], entity['system']))
      }
    });
    return identifiers;
  }
}

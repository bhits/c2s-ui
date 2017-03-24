import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Identifier} from "./identifier.model";

@Injectable()
export class UtilityService {

  constructor(private router: Router, private datePipe: DatePipe) {
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  removeAll(entries: any[]) {
    entries.splice(0, entries.length);
  }

  formatDate(aDate: Date, dateFormat: string) {
    return this.datePipe.transform(aDate, dateFormat);
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

  dateToLocalDate(aDate:Date):number[]{
    if(aDate){
      let dateArray = (this.formatDate(aDate, 'MM/dd/yyyy')).split('/');
      if(!isNaN(parseInt(dateArray[0])) && !isNaN(parseInt(dateArray[1])) && !isNaN(parseInt(dateArray[2]))){
        return [parseInt(dateArray[2]),parseInt( dateArray[0]), parseInt(dateArray[1]) ];
      }
    }
    return [];
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

  isPastDate(dateStr: string){
    return (new Date(dateStr) < new Date())
  }

  isStarteAfterEndDate(startDate:string, endDate:string){
    if(this.isDefined(startDate) && this.isDefined(endDate)){
      return (new Date(startDate) > new Date(endDate));
    }
  }
}

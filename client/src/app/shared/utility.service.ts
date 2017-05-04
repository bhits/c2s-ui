import {Injectable} from "@angular/core";
import {DatePipe, Location} from "@angular/common";
import {Router} from "@angular/router";
import {Identifier} from "./identifier.model";
import {BrowserService} from "../core/browser.service";

@Injectable()
export class UtilityService {

  constructor(private location: Location,
              private router: Router,
              private datePipe: DatePipe,
              private browserService: BrowserService) {
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

  downloadFile(content, filename, fileFormat): void {
    const file = this.base64StringtoBlob(content, fileFormat);
    if (this.browserService.isIE()) {
      filename = filename + '.pdf';
      window.navigator.msSaveBlob(file, filename);
    } else if (this.browserService.isFireFox()) {
      filename = filename + '.pdf';
      this.saveFileToDiskInChromeAndFF(file, filename);
    } else if (this.browserService.isChrome() || this.browserService.isSafari()) {
      this.saveFileToDiskInChromeAndFF(file, filename);
    }
  }

  base64StringtoBlob(b64Data, contentType, sliceSize ?): Blob {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  saveFileToDiskInChromeAndFF(blobFile, filename): void {
    const blobURL = (window.URL || (<any>window).webkitURL).createObjectURL(blobFile);
    const anchor = <any>document.createElement("a");
    anchor.style = "display: none";
    anchor.download = filename;
    anchor.href = blobURL;
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(function () {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobURL);
    }, 100);
  }

  convertJsonObjToStrMap(jsonStr) {
    const strMap = new Map();
    for (let k of Object.keys(jsonStr)) {
      strMap.set(k, jsonStr[k]);
    }
    return strMap;
  }

  dateToLocalDate(aDate: Date): number[] {
    if (aDate) {
      let dateArray = (this.formatDate(aDate, 'MM/dd/yyyy')).split('/');
      if (!isNaN(parseInt(dateArray[0])) && !isNaN(parseInt(dateArray[1])) && !isNaN(parseInt(dateArray[2]))) {
        return [parseInt(dateArray[2]), parseInt(dateArray[0]), parseInt(dateArray[1])];
      }
    }
    return [];
  }

  createIdentifiers(entities: any): Identifier[] {
    let identifiers: Identifier[] = [];
    entities.forEach(entity => {
      if (entity['value'] && entity['system']) {
        identifiers.push(new Identifier(entity['value'], entity['system']))
      }
    });
    return identifiers;
  }

  isPastDate(dateStr: Date){
    if(this.isDefined(dateStr) ){
      let today = new Date();
      today.setHours(0,0,0,0); // Reset Time
      return ((dateStr).valueOf() < today.valueOf());
    }
  }

  isStarteAfterEndDate(startDate:Date, endDate:Date){
    if(this.isDefined(startDate) && this.isDefined(endDate)){
      return (startDate.valueOf() >= endDate.valueOf());
    }
  }

  getCurrentNormalizedPath(): string {
    const includeHash: boolean = true;
    return this.location.path(includeHash);
  }

  getSupportedLocaleCode(supportedLocales:any){
    let localeCode:string [] = [];
    supportedLocales.forEach(locale =>{
      localeCode.push(locale.code);
    });
    return localeCode;
  }
}

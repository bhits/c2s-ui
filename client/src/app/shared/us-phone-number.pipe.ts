import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'usPhoneNumber'
})
export class UsPhoneNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let phoneNumber = value.toString().trim().replace(/^\+/, '');
    let areaCode = phoneNumber.slice(0, 3);
    let digitNumber = phoneNumber.slice(3);

    return (" (" + areaCode + ") " + digitNumber.slice(0, 3) + '-' + digitNumber.slice(3)).trim();
  }
}

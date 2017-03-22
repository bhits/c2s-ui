import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  constructor() { }

  setItemInSessionStorage(key:string, value:any){
    sessionStorage.setItem(key,JSON.stringify(value) );
  }

  getItemFromSessionStorage(key:string):any{
    return JSON.parse(sessionStorage.getItem(key));
  }

  removeItemFromSessionStorage(key:string):void{
    sessionStorage.removeItem(key);
  }

}

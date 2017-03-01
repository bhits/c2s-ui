import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class UtiltityService {

  constructor(private router: Router) { }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  removeAll(entries:any[]){
    entries.splice(0,entries.length);
  }
}

import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Config} from "./config";

@Injectable()
export class ConfigService {

  constructor(private http: Http) { }

  // public load() {
  //   this.http.get("/c2s-ui-api/c2s-ui/config")
  //     .map((resp: any) => <Config>(resp.json()))
  //     .subscribe(
  //       (config) => {
  //         if (config && config.baseHref) {
  //           sessionStorage.setItem('base-href', '/'.concat(config.baseHref).concat('/'))
  //         } else {
  //           throw new Error('Cannot load Base Href...');
  //         }
  //       },
  //       (error) => {
  //         throw new Error('Error in getting Base Href...');
  //       }
  //     );
  //
  // }

  private config: any;

  load() {
    this.http.get("/c2s-ui-api/c2s-ui/config")
      .map((resp: any) => <Config>(resp.json()))
      .subscribe(
        (contextPath) => {
          if (contextPath && contextPath.baseHref) {
            sessionStorage.setItem('base-href', '/'.concat( contextPath.baseHref).concat( '/'))
          } else {
            throw new Error('Cannot load Base Href...');
          }
        },
        (error) => {
          throw new Error('Error in getting Base Href...');
        }
      );

  }

  getConfig(){
    return this.config;
  }

}

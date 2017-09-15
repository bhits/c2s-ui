

import {Http} from "@angular/http";
import {Config} from "src/app/core/shared/config";
import {Observable} from "rxjs/Observable";


export function loadConfig(http: Http) {
  // http.get("/c2s-ui-api/c2s-ui/config")
  //   .map((resp: any) => <Config>(resp.json()))
  //   .subscribe(
  //     (contextPath) =>{
  //       if(contextPath && contextPath.baseHref){
  //         sessionStorage.setItem('base-href', '/'.concat( contextPath.baseHref).concat( '/'))
  //       }else{
  //         throw new Error('Cannot load Base Href...');
  //       }
  //     },
  //     (error) =>{
  //       throw new Error('Error in getting Base Href...');
  //     }
  //   );

    // http.get("/c2s-ui-api/c2s-ui/config")
    // .map((resp: any) => <Config>(resp.json()))
    // .subscribe(
    //   (contextPath) =>{
    //     if(contextPath && contextPath.baseHref){
    //       sessionStorage.setItem('base-href', '/'.concat( contextPath.baseHref).concat( '/'))
    //     }else{
    //       throw new Error('Cannot load Base Href...');
    //     }
    //   },
    //   (error) =>{
    //     throw new Error('Error in getting Base Href...');
    //   }
    // );

  http.get("/c2s-ui-api/c2s-ui/config")
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

export function getContextPathFromSessionStorage(http: Http){

  const baseHref = sessionStorage.getItem("base-href");
  if(baseHref){
    return baseHref
  }else {
    throw new Error('Error in getting Base Href from session storage...');
  }
}

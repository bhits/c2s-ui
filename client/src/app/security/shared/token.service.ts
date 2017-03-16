import { Injectable } from '@angular/core';
import {Response} from "@angular/http";
import {SessionStorageService} from "./session-storage.service";
import {UaaToken} from "./uaa-token";


@Injectable()
export class TokenService {
  private UAA_TOKEN_KEY:string = 'c2s-uaa-token';

  constructor(private sessionStorageService : SessionStorageService) { }

  getToken(): UaaToken{
    return this.sessionStorageService.getItemFromSessionStorage(this.UAA_TOKEN_KEY);
  }

  setToken(response: Response){
    this.sessionStorageService.setItemInSessionStorage(this.UAA_TOKEN_KEY, this.createTokenObject(response.json()));
  }

  deleteToken(){
    this.sessionStorageService.removeItemFromSessionStorage(this.UAA_TOKEN_KEY);
  }

  private createTokenObject(token:any): UaaToken{
    let uaaToken = new UaaToken();
    uaaToken.accessToken = token.access_token;
    uaaToken.exspiresIn = token.expires_in;
    uaaToken.jti = token.jti;
    uaaToken.refreshToken = token.refresh_token;
    uaaToken.scope = token.scope;
    uaaToken.tokenType = token.token_type;

    return token;
  }

}

import { Injectable } from '@angular/core';
import {Response} from "@angular/http";
import {SessionStorageService} from "./session-storage.service";
import {AccessToken} from "./access-token.model";
import {Profile} from "../../core/profile.model";


@Injectable()
export class TokenService {
  private ACCESS_TOKEN_KEY:string = 'c2s-access-token';
  private USER_PROFILE_KEY:string = 'c2s-user-profile-token';
  private PROVIDER_COUNT_KEY:string = 'c2s-provider-count';

  constructor(private sessionStorageService : SessionStorageService) { }

  getAccessToken(): AccessToken{
    return this.sessionStorageService.getItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }

  setAccessToken(response: Response){
    this.sessionStorageService.setItemInSessionStorage(this.ACCESS_TOKEN_KEY, this.createTokenObject(response.json()));
  }

  deleteAccessToken(){
    this.sessionStorageService.removeItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }


  deleteProfileToken(){
    this.sessionStorageService.removeItemFromSessionStorage(this.USER_PROFILE_KEY);
  }

  getProfileToken(): Profile{
    return this.sessionStorageService.getItemFromSessionStorage(this.USER_PROFILE_KEY);
  }

  storeUserProfile(userProfile:any){
    this.sessionStorageService.setItemInSessionStorage(this.USER_PROFILE_KEY, userProfile);
  }

  storeProviderCount(count:Number){
    this.sessionStorageService.setItemInSessionStorage(this.PROVIDER_COUNT_KEY, count);
  }

  getProviderCount(){
    return this.sessionStorageService.getItemFromSessionStorage(this.PROVIDER_COUNT_KEY);
  }

  deleteProviderCount(){
    this.sessionStorageService.removeItemFromSessionStorage(this.PROVIDER_COUNT_KEY);
  }

  createProfileObject(uaaProfile:any): Profile{
    let profile = new Profile();
    profile.email = uaaProfile.email;
    profile.userName = uaaProfile.user_name;
    profile.givenName = uaaProfile.given_name;
    profile.familyName = uaaProfile.family_name;
    profile.name = uaaProfile.name;
    profile.userId = uaaProfile.user_id;

    return profile;
  }

  private createTokenObject(token:any): AccessToken{
    let uaaToken = new AccessToken();
    uaaToken.accessToken = token.access_token;
    uaaToken.exspiresIn = token.expires_in;
    uaaToken.jti = token.jti;
    uaaToken.refreshToken = token.refresh_token;
    uaaToken.scope = token.scope;
    uaaToken.tokenType = token.token_type;

    return token;
  }

}

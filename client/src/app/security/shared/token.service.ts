import {Injectable} from '@angular/core';
import {SessionStorageService} from "./session-storage.service";
import {Profile} from "../../core/profile.model";
import {AuthorizationResponse} from "./authorization-response.model";


@Injectable()
export class TokenService {
  private ACCESS_TOKEN_KEY: string = 'c2s-access-token';
  private USER_PROFILE_KEY: string = 'c2s-user-profile-token';
  private PROVIDER_COUNT_KEY: string = 'c2s-provider-count';
  private MASTER_UI_LOGIN: string = 'c2s-master-ui-login';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  getAccessToken(): AuthorizationResponse {
    return this.sessionStorageService.getItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }

  setAccessToken(accessToken: AuthorizationResponse) {
    this.sessionStorageService.setItemInSessionStorage(this.ACCESS_TOKEN_KEY, accessToken);
  }

  deleteAccessToken() {
    this.sessionStorageService.removeItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }


  deleteProfileToken() {
    this.sessionStorageService.removeItemFromSessionStorage(this.USER_PROFILE_KEY);
  }

  getProfileToken(): Profile {
    return this.sessionStorageService.getItemFromSessionStorage(this.USER_PROFILE_KEY);
  }

  storeUserProfile(userProfile: any) {
    this.sessionStorageService.setItemInSessionStorage(this.USER_PROFILE_KEY, userProfile);
  }

  storeProviderCount(count: Number) {
    this.sessionStorageService.setItemInSessionStorage(this.PROVIDER_COUNT_KEY, count);
  }

  getProviderCount() {
    return this.sessionStorageService.getItemFromSessionStorage(this.PROVIDER_COUNT_KEY);
  }

  getMasterUiLoginUrl(): string{
    return this.sessionStorageService.getItemFromSessionStorage(this.MASTER_UI_LOGIN);
  }

  createProfileObject(uaaProfile: any): Profile {
    let profile = new Profile();
    profile.email = uaaProfile.email;
    profile.userName = uaaProfile.user_name;
    profile.givenName = uaaProfile.given_name;
    profile.familyName = uaaProfile.family_name;
    profile.name = uaaProfile.name;
    profile.userId = uaaProfile.user_id;

    return profile;
  }

}

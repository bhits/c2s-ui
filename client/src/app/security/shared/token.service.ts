import {Injectable} from '@angular/core';
import {SessionStorageService} from "./session-storage.service";
import {AuthorizationResponse} from "./authorization-response.model";


@Injectable()
export class TokenService {
  private ACCESS_TOKEN_KEY: string = 'c2s-access-token';
  private PROVIDER_COUNT_KEY: string = 'c2s-provider-count';
  private MASTER_UI_LOGIN: string = 'c2s-master-ui-login';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public getAccessToken(): AuthorizationResponse {
    return this.sessionStorageService.getItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }

  public setAccessToken(accessToken: AuthorizationResponse): void {
    this.sessionStorageService.setItemInSessionStorage(this.ACCESS_TOKEN_KEY, accessToken);
  }

  public deleteAccessToken(): void {
    this.sessionStorageService.removeItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }

  public storeProviderCount(count: Number): void {
    this.sessionStorageService.setItemInSessionStorage(this.PROVIDER_COUNT_KEY, count);
  }

  public getProviderCount() {
    return this.sessionStorageService.getItemFromSessionStorage(this.PROVIDER_COUNT_KEY);
  }

  public getMasterUiLoginUrl(): string {
    return this.sessionStorageService.getItemFromSessionStorage(this.MASTER_UI_LOGIN);
  }
}

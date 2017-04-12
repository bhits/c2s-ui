import {Injectable} from "@angular/core";
import {SessionStorageService} from "../../security/shared/session-storage.service";
import {AccountVerificationRequest} from "app/account/shared/account-verification-request.model";

@Injectable()
export class AccountVerificationService {
  private USERNAME_KEY: string = 'username';
  private VERIFICATION_INFO_KEY: string = 'verification-info';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public retrieveEmailToken(verificationPath: string): string {
    const SEPARATOR: string = "emailToken=";
    return verificationPath.split(SEPARATOR).pop();
  }

  public setUsername(username: string): void {
    this.sessionStorageService.setItemInSessionStorage(this.USERNAME_KEY, username);
  }

  public getUsername(): string {
    return this.sessionStorageService.getItemFromSessionStorage(this.USERNAME_KEY);
  }

  public setVerificationInfo(verificationInfo: AccountVerificationRequest): void {
    this.sessionStorageService.setItemInSessionStorage(this.VERIFICATION_INFO_KEY, verificationInfo);
  }

  public getVerificationInfo(): AccountVerificationRequest {
    return this.sessionStorageService.getItemFromSessionStorage(this.VERIFICATION_INFO_KEY);
  }

  public deleteVerificationInfo(): void {
    this.sessionStorageService.removeItemFromSessionStorage(this.USERNAME_KEY);
    this.sessionStorageService.removeItemFromSessionStorage(this.VERIFICATION_INFO_KEY);
  }
}

import {Injectable} from "@angular/core";
import {SessionStorageService} from "../../security/shared/session-storage.service";
import {AccountVerificationRequest} from "./account-verification-request.model";

@Injectable()
export class AccountVerificationService {
  private USER_ID_KEY: string = 'user-id';
  private VERIFICATION_INFO_KEY: string = 'verification-info';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public retrieveEmailToken(verificationPath: string): string {
    const SEPARATOR: string = "emailToken=";
    return verificationPath.split(SEPARATOR).pop();
  }

  public setUserId(userId: string): void {
    this.sessionStorageService.setItemInSessionStorage(this.USER_ID_KEY, userId);
  }

  public getUserId(): string {
    return this.sessionStorageService.getItemFromSessionStorage(this.USER_ID_KEY);
  }

  public setVerificationInfo(verificationInfo: AccountVerificationRequest): void {
    this.sessionStorageService.setItemInSessionStorage(this.VERIFICATION_INFO_KEY, verificationInfo);
  }

  public getVerificationInfo(): AccountVerificationRequest {
    return this.sessionStorageService.getItemFromSessionStorage(this.VERIFICATION_INFO_KEY);
  }

  public deleteVerificationInfo(): void {
    this.sessionStorageService.removeItemFromSessionStorage(this.USER_ID_KEY);
    this.sessionStorageService.removeItemFromSessionStorage(this.VERIFICATION_INFO_KEY);
  }
}

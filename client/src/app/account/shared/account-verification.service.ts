import {Injectable} from "@angular/core";
import {SessionStorageService} from "../../security/shared/session-storage.service";
import {AccountVerificationRequest} from "./account-verification-request.model";
import {AccountActivationResponse} from "./account-activation-response.model";

@Injectable()
export class AccountVerificationService {
  private USER_FULL_NAME_KEY: string = 'user-full-name';
  private USER_PREFERRED_LOCALE_KEY: string = 'user-preferred-locale';
  private VERIFICATION_INFO_KEY: string = 'verification-info';
  private emailToken: string;

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public retrieveEmailLinkInfo(verificationPath: string): void {
    const SEPARATOR: string = "emailToken=";
    const LOCALE_SEPARATOR: string = "&userPreferredLocale=";
    let emailLinkInfoValue: string = verificationPath.split(SEPARATOR).pop();
    if (emailLinkInfoValue != null) {
      let emailToken: string = emailLinkInfoValue.split(LOCALE_SEPARATOR)[0];
      let userPreferredLocale: string = emailLinkInfoValue.split(LOCALE_SEPARATOR)[1];
      this.setEmailToken(emailToken);
      this.setUserPreferredLocaleInStorage(userPreferredLocale);
    }
  }

  private setEmailToken(emailToken: string) {
    this.emailToken = emailToken;
  }

  public getEmailToken(): string {
    return this.emailToken;
  }

  private setUserPreferredLocaleInStorage(locale: string) {
    this.sessionStorageService.setItemInSessionStorage(this.USER_PREFERRED_LOCALE_KEY, locale)
  }

  public getUserPreferredLocale(): string {
    return this.sessionStorageService.getItemFromSessionStorage(this.USER_PREFERRED_LOCALE_KEY);
  }

  public setUserFullName(activationResponse: AccountActivationResponse): void {
    let userFullName: string = AccountVerificationService.getName(activationResponse, 'firstName').concat(' ').concat(AccountVerificationService.getName(activationResponse, 'middleName')).concat(' ').concat(AccountVerificationService.getName(activationResponse, 'lastName'));
    this.sessionStorageService.setItemInSessionStorage(this.USER_FULL_NAME_KEY, userFullName);
  }

  public getUserFullName(): string {
    return this.sessionStorageService.getItemFromSessionStorage(this.USER_FULL_NAME_KEY);
  }

  public setVerificationInfo(verificationInfo: AccountVerificationRequest): void {
    this.sessionStorageService.setItemInSessionStorage(this.VERIFICATION_INFO_KEY, verificationInfo);
  }

  public getVerificationInfo(): AccountVerificationRequest {
    return this.sessionStorageService.getItemFromSessionStorage(this.VERIFICATION_INFO_KEY);
  }

  public deleteVerificationInfo(): void {
    this.sessionStorageService.removeItemFromSessionStorage(this.VERIFICATION_INFO_KEY);
  }

  public deleteUserFullName(): void {
    this.sessionStorageService.removeItemFromSessionStorage(this.USER_FULL_NAME_KEY);
  }

  public deleteEmailLinkInfo(): void {
    this.sessionStorageService.removeItemFromSessionStorage(this.USER_PREFERRED_LOCALE_KEY);
  }

  private static getName(activationResponse: AccountActivationResponse, key: string): string {
    if (activationResponse !== null && activationResponse[key]) {
      return activationResponse[key];
    }
    return ''
  }
}

export enum EmailLinkInfoKey {
  EMAIL_TOKEN,
  USER_PREFERRED_LOCALE
}

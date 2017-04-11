import {Injectable} from "@angular/core";
import {SessionStorageService} from "app/security/shared/session-storage.service";

@Injectable()
export class EmailTokenService {
  private EMAIL_TOKEN_KEY: string = 'email-token';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public setEmailToken(verificationPath: string): void {
    const SEPARATOR: string = "emailToken=";
    const emailToken: string = verificationPath.split(SEPARATOR).pop();
    this.sessionStorageService.setItemInSessionStorage(this.EMAIL_TOKEN_KEY, emailToken);
  }

  public getEmailToken(): string {
    return this.sessionStorageService.getItemFromSessionStorage(this.EMAIL_TOKEN_KEY);
  }

  public deleteEmailToken(): void {
    this.sessionStorageService.removeItemFromSessionStorage(this.EMAIL_TOKEN_KEY);
  }
}

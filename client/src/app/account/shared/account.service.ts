import {Injectable} from "@angular/core";
import {ExceptionService} from "../../core/exception.service";
import {Http, Response} from "@angular/http";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs/Observable";
import {AccountVerificationRequest} from "./account-verification-request.model";
import {AccountVerificationResponse} from "./account-verification-response.model";
import {AccountActivationRequest} from "app/account/shared/account-activation-request.model";
import {AccountActivationResponse} from "app/account/shared/account-activation-response.model";

@Injectable()
export class AccountService {
  private umsUserUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl().concat("/users");
  private userFullName: string;

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public verifyAccount(verificationRequest: AccountVerificationRequest): Observable<AccountVerificationResponse> {
    const VERIFY_ACCOUNT_URL = this.umsUserUrl.concat("/verifications");
    return this.http.post(VERIFY_ACCOUNT_URL, verificationRequest)
      .map((resp: Response) => <AccountVerificationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public activateAccount(activationRequest: AccountActivationRequest): Observable<AccountActivationResponse> {
    const ACTIVATE_ACCOUNT_URL = this.umsUserUrl.concat("/activations");
    return this.http.post(ACTIVATE_ACCOUNT_URL, activationRequest)
      .map((resp: Response) => <AccountActivationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public setUserFullName(activationResponse: AccountActivationResponse): void {
    this.userFullName = AccountService.getName(activationResponse, 'firstName').concat(' ').concat(AccountService.getName(activationResponse, 'middleName')).concat(' ').concat(AccountService.getName(activationResponse, 'lastName'));
  }

  public getUserFullName(): string {
    return this.userFullName;
  }

  private static getName(activationResponse: AccountActivationResponse, key: string): string {
    if (activationResponse !== null && activationResponse[key]) {
      return activationResponse[key];
    }
    return ''
  }
}

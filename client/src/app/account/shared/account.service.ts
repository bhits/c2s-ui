import {Injectable} from "@angular/core";
import {ExceptionService} from "../../core/exception.service";
import {Http, Response} from "@angular/http";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs/Observable";
import {AccountVerificationRequest} from "./account-verification-request.model";
import {AccountVerificationResponse} from "./account-verification-response.model";

@Injectable()
export class AccountService {
  private umsUserUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl().concat("/users");

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public verifyUserCreation(verificationRequest: AccountVerificationRequest): Observable<AccountVerificationResponse> {
    const VERIFY_USER_CREATION_URL = this.umsUserUrl.concat("/verifications");
    return this.http.post(VERIFY_USER_CREATION_URL, verificationRequest)
      .map((resp: Response) => <AccountVerificationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}

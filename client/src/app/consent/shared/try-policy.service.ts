import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "../../core/exception.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {Observable} from "rxjs/Observable";
import {LimitedProfileService} from "src/app/security/shared/limited-profile.service";
import {TryPolicyResponse} from "src/app/consent/shared/try-policy-response.model";

@Injectable()
export class TryPolicyService {

  constructor(private http: Http,
              private exceptionService: ExceptionService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private limitedProfileService: LimitedProfileService) {
  }

  public applyTryPolicyAgainstConsent(consentId: number, documentId: string, purposeOfUseCode: string): Observable<TryPolicyResponse> {
    let currentUserMrn: string = this.limitedProfileService.getUserMrn();
    const resourceUrl = this.c2sUiApiUrlService.getTryPolicyBaseUrl()
      .concat("/tryPolicyXHTML/" + currentUserMrn);
    let params: URLSearchParams = new URLSearchParams();
    params.set('consentId', consentId.toString());
    params.set('documentId', documentId);
    params.set('purposeOfUseCode', purposeOfUseCode);

    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <TryPolicyResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public handleApplyTryPolicySuccess(tryPolicyResponse: TryPolicyResponse): void {
    let decodedDocument = this.based64DecodedUnicode(tryPolicyResponse.document);
    let viewer = window.open('', '_blank');
    viewer.document.open().write(decodedDocument);
  }

  // Deal with non-ASCII characters of Spanish
  private based64DecodedUnicode(str): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}

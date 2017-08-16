import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {ProfileFieldsLookupInfo} from "./profile-fields-lookup-info.model";
import {ExceptionService} from "../../core/exception.service";

@Injectable()
export class ProfileFieldsLookupService {
  private umsPatientUrl: string = this.c2sUiApiUrlService.getUmsBaseUrl();

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getProfileFieldsLookupInfo(): Observable<ProfileFieldsLookupInfo> {
    return this.http.get(this.umsPatientUrl.concat("/userCreationLookupInfo"))
      .map((resp: Response) => <ProfileFieldsLookupInfo>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}

import {Injectable} from "@angular/core";
import {ExceptionService} from "./exception.service";
import {NotificationService} from "./notification.service";
import {Http, Response} from "@angular/http";
import {Config} from "./config.model";
import {Observable} from "rxjs/Observable";
import {SessionStorageService} from "../security/shared/session-storage.service";
import {TokenService} from "../security/shared/token.service";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";

@Injectable()
export class ConfigService {
  private C2S_CONFIG_KEY: string = 'c2s-config';

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private sessionStorageService: SessionStorageService) {
  }

  public getConfig(): Observable<Config> {
    const resourceUrl = this.c2sUiApiUrlService.getConfigBaseUrl();
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Config>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getConfigInSessionStorage(): Config {
    let config: Config = this.sessionStorageService.getItemFromSessionStorage(this.C2S_CONFIG_KEY);
    if (config != null) {
      return config;
    } else {
      // If logged in using master-ui then get config
      if (this.tokenService.getAccessToken()) {
        // Get config data once login
        this.getConfig().subscribe(
          (config: Config) => {
            this.setConfigInSessionStorage(config);
          },
          (err) => {
            this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
          }
        );
      } else {
        this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
      }
    }
  }

  public setConfigInSessionStorage(config: Config): void {
    this.sessionStorageService.setItemInSessionStorage(this.C2S_CONFIG_KEY, config);
  }
}

import {Injectable} from "@angular/core";
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  XHRBackend
} from "@angular/http";
import {Observable} from "rxjs";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
              private slimLoadingBarService: SlimLoadingBarService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.slimLoadingBarService.start();
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.do(() => this.slimLoadingBarService.complete());
  }
}

export function httpInterceptorServiceFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, slimLoadingBarService: SlimLoadingBarService) {
  return new HttpInterceptorService(xhrBackend, requestOptions, slimLoadingBarService);
}

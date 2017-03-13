import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalEventManagerService {

  private showHeaderAndFooter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showHeaderAndFooterEmitter: Observable<boolean> = this.showHeaderAndFooter.asObservable();

  constructor() { }

  setShowHeaderAndFooter(show: boolean) {
    this.showHeaderAndFooter.next(show);
  }
}

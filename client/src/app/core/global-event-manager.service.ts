import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import {Profile} from "./profile.model";

@Injectable()
export class GlobalEventManagerService {

  private showHeaderAndFooter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showHeaderAndFooterEmitter: Observable<boolean> = this.showHeaderAndFooter.asObservable();

  private userProfileSudject: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  public userProfileEmitter: Observable<Profile> = this.userProfileSudject.asObservable();

  constructor() { }

  setShowHeaderAndFooter(show: boolean) {
    this.showHeaderAndFooter.next(show);
  }

  setProfile(profile: Profile){
    this.userProfileSudject.next(profile);
  }

  getUserProfileEmitter(): Observable<Profile>{
    return this.userProfileEmitter;
  }

  getShowHEaderAndFooterEmitter(): Observable<boolean>{
    return this.showHeaderAndFooterEmitter;
  }
}

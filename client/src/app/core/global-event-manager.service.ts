import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import {Profile} from "./profile.model";

@Injectable()
export class GlobalEventManagerService {

  private showHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showHeaderEmitter: Observable<boolean> = this.showHeader.asObservable();

  private userProfileSudject: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  public userProfileEmitter: Observable<Profile> = this.userProfileSudject.asObservable();

  constructor() { }

  setShowHeader(show: boolean) {
    this.showHeader.next(show);
  }

  setProfile(profile: Profile){
    this.userProfileSudject.next(profile);
  }

  getUserProfileEmitter(): Observable<Profile>{
    return this.userProfileEmitter;
  }

  getShowHeaderEmitter(): Observable<boolean>{
    return this.showHeaderEmitter;
  }
}

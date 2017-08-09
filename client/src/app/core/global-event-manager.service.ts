import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Profile} from "./profile.model";

@Injectable()
export class GlobalEventManagerService {

  private showHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showHeaderEmitter: Observable<boolean> = this.showHeader.asObservable();

  private userProfileSubject: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  public userProfileEmitter: Observable<Profile> = this.userProfileSubject.asObservable();

  constructor() {
  }

  public setShowHeader(show: boolean): void {
    this.showHeader.next(show);
  }

  public getShowHeaderEmitter(): Observable<boolean> {
    return this.showHeaderEmitter;
  }

  public setProfile(profile: Profile): void {
    this.userProfileSubject.next(profile);
  }

  public getUserProfileEmitter(): Observable<Profile> {
    return this.userProfileEmitter;
  }
}

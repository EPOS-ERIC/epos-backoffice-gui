import { Injectable } from '@angular/core';
import { User } from 'generated/backofficeSchemas';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserService {
  private activeUserInfo = new BehaviorSubject<User | null>(null);
  public activeUserInfoObservable = this.activeUserInfo.asObservable();

  public setActiveUserInfo(userInfo: User | null): void {
    this.activeUserInfo.next(userInfo);
  }

  public getActiveUser(): User | null {
    return this.activeUserInfo.getValue();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  USERNAME_KEY = 'AuthUsername';
  TYPE_KEY = 'AuthType';
  UserID_KEY = 'AuthUserID';

  constructor() { }

  public saveUserID(userID: string) {
    window.sessionStorage.removeItem(this.UserID_KEY);
    window.sessionStorage.setItem(this.UserID_KEY, userID);
  }

  public getUserID(): string {
    return sessionStorage.getItem(this.UserID_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(this.USERNAME_KEY);
    window.sessionStorage.setItem(this.USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(this.USERNAME_KEY);
  }

  public saveType(type: string) {
    window.sessionStorage.removeItem(this.TYPE_KEY);
    window.sessionStorage.setItem(this.TYPE_KEY, type);
  }

  public getType(): string {
    return sessionStorage.getItem(this.TYPE_KEY);
  }

  public isAdmin(){
    return this.getType() == ("ADMIN");
  }

  public signout() {
    window.sessionStorage.clear();
  }


}

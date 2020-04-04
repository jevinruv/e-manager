import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  USERNAME_KEY = 'AuthUsername';
  TYPE_KEY = 'AuthType';

  constructor() { }

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

  signout() {
    window.sessionStorage.clear();
  }


}

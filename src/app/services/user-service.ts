import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _loggedIn = false;

  login(): void {
    this._loggedIn = true;
  }

  logout(): void {
    this._loggedIn = false;
  }

  get status(): boolean {
    return this._loggedIn;
  }
}

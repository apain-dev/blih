import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {RequestService} from './request.service';

@Injectable()
export class UserService {
  _user: User;

  constructor(private _RequestService: RequestService) {
    const user = localStorage.getItem('user');
    if (user && user.length > 0) {
      try {
        this._user = JSON.parse(user);
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  get user(): User {
    return this._user;
  }


  getName() {
    return (this._user.firstName + ' ' + this._user.lastName);
  }

  getUser() {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}

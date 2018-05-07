import {User} from "./user";
import {Repo} from "./repo";

export class Contributor {
  public _user: User;
  public _shared: Repo[] = [];
  public _isEnable: string = '0';
  public _color: string = '';

  constructor(firstName: string = '', lastName: string = '', mail: string = '', pass: string = '', token: string = '') {
    this._user = new User(firstName, lastName, mail, pass, token);
  }
  copy(user:User, shared: Repo[], isEnable: string, color: string)
  {
    this._user = user;
    this._shared = shared;
    this._isEnable = isEnable;
    this._color = color;
  }
  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get shared(): Repo[] {
    return this._shared;
  }

  set shared(value: Repo[]) {
    this._shared = value;
  }

  get isEnable(): string {
    return this._isEnable;
  }

  set isEnable(value: string) {
    this._isEnable = value;
  }
}

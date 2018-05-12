import {Injectable} from '@angular/core';
import {Test} from "../model/Test";
import {notification} from "../model/notification";
import {RequestAnswer} from "../model/RequestAnswer";
import {NotificationService} from "./notification.service";
import {User} from "../model/user";
import {Repo} from "../model/repo";
import {RequestService} from "./request.service";

@Injectable()
export class ConfigService {
  private _first: Test;
  private _second: Test;
  private _third: Test;
  private _ready: boolean;

  constructor(private RequestService: RequestService, private NotifService: NotificationService) {
   this.reset();
  }

  get first(): Test {
    return this._first;
  }

  get second(): Test {
    return this._second;
  }

  get third(): Test {
    return this._third;
  }

  set ready(value: boolean) {
    this._ready = value;
  }

  get ready(): boolean {
    return this._ready;
  }

  error(step: number, msg: string = '') {
    this.NotifService.error(new notification('Test ' + step, 'Error: ' + msg));
  }

  success(step: number, msg: string = '') {
      this.NotifService.success(new notification('Test', 'All tests complete' + msg));
  }

  runFirst(user: User) {
    return new Promise((resolve) => {
      this.RequestService.whoAmI(user).then((answer: RequestAnswer) => {
        if (answer._status === true) {
          this._first.error = answer._status;
          this._first.type = 'danger';
        }
        else {
          this._first.error = false;
          this._first.type = 'success';
        }
        this._first.percent = 100;
        this._first.answer = answer._data;
        resolve(answer);
      }).catch((answer) => {
        console.log('reject');
        resolve(answer);
      });
    });
  }

  runSecond(user: User) {
    return new Promise((resolve, reject) => {
      this.RequestService.getList(user).then((answer: RequestAnswer) => {
        if (answer._status === true) {
          this._second.error = true;
          this._second.type = 'danger';
        }
        else {
          this._second.error = false;
          this._second.type = 'success';
        }
        this._second.percent = 100;
        this._second.answer = answer._data;
        resolve(answer);
      });
    });
  }

  runThird(user: User, repo: Repo) {
    return new Promise((resolve) => {
      this.RequestService.getAcl(user, repo).then((answer: RequestAnswer) => {
        if (answer._status === true) {
          this._third.error = true;
          this._third.type = 'danger';
        }
        else {
          this._third.error = false;
          this._third.type = 'success';
        }
        this._third.percent = 100;
        this._third.answer = answer._data;
        resolve(answer);
      });
    });
  }

  /**
   *
   * @param {User} user
   * @returns {Promise<any>}
   */
  eval(user: User) {
    let self = this;
    this.NotifService.info(new notification('User', 'Starting tests'));
    return new Promise((resolve, reject) => {
      this.runFirst(user).then((answer: RequestAnswer) => {
        if (self.first.error === true) {
          self.error(1, answer._data);
          reject(answer);
          return;
        }
        this.runSecond(user).then((secondAnswer: RequestAnswer) => {
          if (self.second.error === true) {
            self.error(2, answer._data);
            reject(secondAnswer);
            return;
          }
          self.runThird(user, secondAnswer._data[0]).then((thirdAnswer: RequestAnswer) => {
            if (self.third.error === true) {
              self.error(3, answer._data);
              reject(thirdAnswer);
              return;
            }
            self._ready = true;
            self.success(3);
            resolve();
          });
        });
      }).catch((answer) => {
        console.log('reject', answer);
      });
    });
  }

  isError() {
    return (this.first.error || this.second.error || this.third.error);
  }

  reset() {
    this._first = new Test();
    this._second = new Test();
    this._third = new Test();
  }
}

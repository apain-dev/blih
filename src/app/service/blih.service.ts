import {ChangeDetectorRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from './request.service';
import {Repo} from '../model/repo';
import {UserService} from './user.service';
import {RequestAnswer} from '../model/RequestAnswer';
import {ContributorsService} from './contributors.service';
import {ToastData, ToastyService} from 'ng2-toasty';
import {notification} from '../model/notification';
import {NotificationService} from './notification.service';
import {CanActivate} from "@angular/router";

@Injectable()
export class BlihService implements CanActivate{
  private _repo: Repo[] = [];
  private _error = false;
  public _selected: Repo;

  constructor(private Request: RequestService, private _userService: UserService, private Contributors: ContributorsService, private notifyService: NotificationService, private toastyService: ToastyService) {
  }

  findRepo(uid): Repo {
    for (let i = 0; i < this._repo.length; i++) {
      if (this._repo[i].uid.search(uid) >= 0) {
        return this._repo[i];
      }
    }
    return null;
  }

  setSelected(repo: Repo) {
    this._selected = repo;
  }

  get getSelected(): Repo {
    return this._selected;
  }

  get repo(): Repo[] {
    return this._repo;
  }

  set repo(value: Repo[]) {
    this._repo = value;
  }
 canActivate() {
    return ((this._selected) ? true : false);
 }
  calcContributorsRepo(): number {
    let count = 0;
    for (const i in this.Contributors.contributors) {
      for (const s in this.Contributors.contributors[i].shared)
        count++;
    }
    return count;
  }

  getRepo(forcedSync = false) {
    let self = this;
    return new Promise(((resolve, reject) => {
      if (self._repo.length === 0 || forcedSync === true) {
        self.setRepo().then(function (answer: RequestAnswer) {
          self._repo = answer._data;
          for (const i in self.Contributors.contributors) {
            for (const s in self.Contributors.contributors[i].shared)
              self._repo.push(self.Contributors.contributors[i].shared[s]);
          }
          resolve(new RequestAnswer(false, self._repo));
        }).catch(function (answer) {
          reject(answer);
        });
      }
      else
        resolve(new RequestAnswer(false, self._repo));
    }));
  }

  setRepo() {
    let self = this;
    return new Promise((resolve, reject) => {
      self.Request.getList(self._userService.user).then(function (answer: RequestAnswer) {
        if (answer._status)
          reject(answer);
        else
          resolve(answer);
      });
    });
  }
  clone(repo: Repo) {
    let self = this;
    let toasId;
    self.notifyService.waiting(new notification('Cloning', repo._name + ' is trying to clone'), null, (toast: ToastData) => {
      toasId = toast.id;
    });

    this.Request.clone((repo.contributor) ? repo.contributor._user : this._userService.user, repo).then((answer: RequestAnswer) => {
      this.toastyService.clear(toasId);
      if (answer._status) {
        self.notifyService.error(new notification('Cloning', answer._data));
      }
      else {
        self.Request.saveFile(repo);
        self.notifyService.success(new notification('Cloning', answer._data));
      }
    });
  }
}

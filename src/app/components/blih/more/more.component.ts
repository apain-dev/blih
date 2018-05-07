import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RequestService} from '../../../service/request.service';
import {Repo} from '../../../model/repo';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {BlihService} from '../../../service/blih.service';
import {RequestAnswer} from '../../../model/RequestAnswer';
import {NotificationService} from '../../../service/notification.service';
import {notification} from '../../../model/notification';
import {ClipboardService} from 'ngx-clipboard';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  providers: []
})


export class MoreComponent implements OnInit {
  _repo: Repo;
  _user: User;
  _acl: RequestAnswer;
  _git: string;
  _description = {
    isError: false,
    data: {
      creation_time: ''
    }
  };
  _isLoading = true;

  /* = {
   user: User,
   isLoading: true,
   repo: Repo,
   Description: {
     isError: {},
     data: {
       creation_time: null
     }
   },
   Acl: {
     isError: false,
     data: []
   }
 };*/

  constructor(private RequestService: RequestService, private UserService: UserService,
              public BlihService: BlihService, public NotifService: NotificationService, private copyService: ClipboardService) {
  }

  clone() {
    this.BlihService.clone(this._repo);
  }

  ngOnInit() {
    const self = this;
    this._repo = this.BlihService.getSelected;

    if (this._repo.contributor) {
      this._user = this._repo.contributor._user;
    } else {
      this._user = this.UserService.user;
    }
    this._git = 'git@git.epitech.eu:/' + this._user.mail + '/' + this._repo._name;

    this.RequestService.getAcl(this._user, this._repo).then((answer: RequestAnswer) => {
      self._acl = answer;
      self._isLoading = false;
    }).catch((answer: RequestAnswer) => {
      self._acl = answer;
      self._isLoading = false;
    });
  }

  copySuccess() {
    this.copyService.copyFromContent(this._git);
    this.NotifService.success(new notification('Git', 'Adress of ' + this._repo._name + ' copied'));
  }

  toString($event) {
    let access = '';

    if ($event.access.left)
      access += 'r';
    if ($event.access.middle)
      access += 'w';
    if ($event.access.right)
      access += 'a';
    return access;
  }

  addAccess($event) {
    $event.access = this.toString($event);
    if (typeof this._acl.data === 'string') {
      this._acl._data = [];
      this._acl._status = false;
    }
    this._acl._data.push($event);
  }

  /*
    changePage($event) {
      $event.preventDefault();
    }
    */
}

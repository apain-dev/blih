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
import {FADE_IN_ANNIMATION} from "../../../animations/fade-in.animation";


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  animations: [FADE_IN_ANNIMATION],
  providers: []
})


export class MoreComponent implements OnInit {
  _repo: Repo;
  _user: User;
  _acl: RequestAnswer;
  _aclEmpty: boolean;
  _git: string;
  _description: Object = null;
  _isLoading = true;

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
    this._git = 'git@git.epitech.eu:/' + this._user.mail + '/' + this._repo.name;

    this.RequestService.getInfo(this.UserService.user, this._repo).then((answer: RequestAnswer) => {
      if (!answer._status)
        self._description = answer._data;
      self.RequestService.getAcl(self.UserService.user, self._repo).then((answer2: RequestAnswer) => {
        self._acl = answer2;
        if (typeof answer2._data === 'string' && answer2._data.search('No') !== -1) {
          self._aclEmpty = true;
        }
      }).catch((answer: RequestAnswer) => {
        self._acl = answer;
        self._isLoading = false;
      });
    });


  }

  copySuccess() {
    this.copyService.copyFromContent(this._git);
    this.NotifService.success(new notification('Git', 'Adress of ' + this._repo.name + ' copied'));
  }

  getDate(timestamp: string) {
    let d = new Date(parseInt(timestamp) * 1000);
    return d.toISOString().replace('T', ' ').replace(/\..*/g, '');
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
    if (this._aclEmpty) {
      this._acl._data = [];
      this._aclEmpty = false;
    }
    this._acl._data.push($event);
  }
}

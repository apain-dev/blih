import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {BlihService} from '../../service/blih.service';
import {ContributorsService} from '../../service/contributors.service';
import {FADE_IN_ANNIMATION} from '../../animations/fade-in.animation';
import {Contributor} from '../../model/Contributor';
import {Socket} from 'ng-socket-io';
import {RequestService} from '../../service/request.service';
import {MOVE_RIGHT_ANIMATION} from '../../animations/move-right-animations';
import {NotificationService} from '../../service/notification.service';
import {notification} from '../../model/notification';
import {ToastData, ToastyService} from 'ng2-toasty';
import {RequestAnswer} from '../../model/RequestAnswer';
import {Repo} from '../../model/repo';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss'],
  animations: [FADE_IN_ANNIMATION, MOVE_RIGHT_ANIMATION]
})
export class ContributorsComponent implements OnInit {
  singleModel: number = 0;
  socket;
  isSyncing = {
    status: false,
    contributor: ''
  };

  constructor(public User: UserService, public Blih: BlihService, public Contributors: ContributorsService, private Request: RequestService, private Notify: NotificationService, private Toasty: ToastyService) {

  }

  removeContributor(contributors: Contributor) {
    this.Contributors.remove(contributors);
  }

  updateSync(status) {
    this.isSyncing.status = status;
  }

  activateContributor(contributor: Contributor) {
    let id;
    this.updateSync(true);
    this.Notify.waiting(new notification('Contributor', contributor.user.firstName + ' is syncing. It may take a while'), null, (toast: ToastData) => {
      id = toast.id;
    });
    // noinspection TypeScriptValidateTypes
    this.Request.contributor(contributor.user, this.User.user).then((answer: RequestAnswer) => {
      this.Toasty.clear(id);
      this.Notify.success(new notification('Contributor', contributor.user.firstName + ' sync with success'));
      for (const i in answer._data)
        contributor.shared.push(new Repo(answer._data[i], '', JSON.parse(JSON.stringify(contributor))));
      this.Contributors.save();
      this.Blih.getRepo(true);
      this.updateSync(false);

    }).catch((answer) => {
      console.log(answer);
      this.Toasty.clear(id);

      this.Notify.error(new notification('Contributor', 'Cannot sync ' + contributor.user.firstName + ' ' + answer));
      this.updateSync(true);

    });
  }

  sync(contributor: Contributor) {
    let id;
    this.updateSync(true);

    contributor._shared = [];
    this.Notify.waiting(new notification('Contributor', contributor.user.firstName + ' is syncing. It may take a while'), null, (toast: ToastData) => {
      id = toast.id;
    });
    // noinspection TypeScriptValidateTypes
    this.Request.contributor(contributor.user, this.User.user).then((answer: RequestAnswer) => {
      this.Toasty.clear(id);
      this.Notify.success(new notification('Contributor', contributor.user.firstName + ' sync with success'));
      for (const i in answer._data)
        contributor.shared.push(new Repo(answer._data[i], '', JSON.parse(JSON.stringify(contributor))));
      this.Contributors.save();
      this.Blih.getRepo(true);
      this.updateSync(false);

    }).catch((answer) => {
      console.log(answer);
      this.Toasty.clear(id);
      this.Notify.error(new notification('Contributor', 'Cannot sync ' + contributor.user.firstName + ' ' + answer));
      this.updateSync(true);
    });
  }

  ngOnInit() {
  }

}

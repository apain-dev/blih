import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';
import {RequestService} from '../../../service/request.service';
import {Router} from '@angular/router';
import {RequestAnswer} from '../../../model/RequestAnswer';
import {NotificationService} from '../../../service/notification.service';
import {notification} from '../../../model/notification';
import {FADE_IN_ANNIMATION} from "../../../animations/fade-in.animation";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css'],
  providers: [ConfigService],
  animations: [FADE_IN_ANNIMATION]
})
export class ModifyUserComponent implements OnInit {
  modifiedUser: User;
  needTest: boolean;
  step = {
    step: 0,
    error: true
  };
  form: {
    part: number,
    logRequired: true
    error: {
      state: false,
      message: ''
    }
  };

  constructor(private RequestService: RequestService, public UserService: UserService, private router: Router, private NotifService: NotificationService, private config: ConfigService) {
    this.step.step = 0;
    this.step.error = false;
  }

  onSubmit() {
    const self = this;

    this.getToken(this.modifiedUser).then(function (answer: RequestAnswer) {
      if (answer._data !== self.UserService.user.token || self.modifiedUser.mail !== self.UserService.user.mail) {
        self.NotifService.warning(new notification('User', 'User has been modified. We need to re-run some tests'));
        self.needTest = true;
        self.modifiedUser.token = answer._data;
        self.step.step = 1;
        self.evalConfig();
      }
      else {
        self.UserService.user = self.modifiedUser;
        self.NotifService.success(new notification('User', 'User modified sucessfully'));
        self.router.navigateByUrl('/home');
      }
    }).catch(function (answer) {
      self.step.error = true;
      self.UserService.user.pass = '';
    });
  }

  evalConfig() {
    this.config.reset();

    this.config.eval(this.modifiedUser).then(() => {
    }).catch((answer) => {
      this.step.error = true;
    });
  }
  stepChange(step: number) {
    this.step.step = step;
    this.step.error = false;
  }
  getToken(user: User = null) {
    return this.RequestService.getToken(user);
  }

  reset() {
    this.config.reset();
    this.step.step = 0;
  }

  ngOnInit() {
    this.config.reset();
    this.modifiedUser = new User();
    this.needTest = false;
    this.modifiedUser = JSON.parse(JSON.stringify(this.UserService.user));
  }
}

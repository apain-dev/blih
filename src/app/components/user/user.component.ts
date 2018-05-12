import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestService} from '../../service/request.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {RequestAnswer} from '../../model/RequestAnswer';
import {NotificationService} from '../../service/notification.service';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {ConfigService} from "../../service/config.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ConfigService],
  animations: [
    trigger('logo', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-5%)'
        }),
        animate('1s ease-in')
      ]),
      transition('* => void', [
        animate('1s 1s ease-out', style({
          opacity: 0
        }))
      ])
    ]),
    trigger('form', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-5%)'
        }),
        animate('0.8s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.2s ease-out', style({
          opacity: 0
        }))
      ])
    ])

  ]
})

export class UserComponent implements OnInit {
  step = {
    step: 0,
    ready: false,
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
  animate = 'in';

  constructor(private RequestService: RequestService, public UserService: UserService, private router: Router,
              private notifyService: NotificationService, private config: ConfigService) {
    this.step.step = -1;
    this.step.error = false;
    this.UserService.user = new User();
    this.config.reset();
  }

  onSubmit() {
    const self = this;

    this.getToken().then(function (answer: any) {
      self.UserService.user.token = answer._data;
      self.UserService.user.pass = '';
      self.animationRunner({triggerName: 'form', fromState: 'out'});
    }).catch(function (answer) {
      self.step.error = true;
      self.UserService.user.pass = '';
    });
  }

  stepChange(step: number) {
    this.step.step = step;
    this.step.error = false;
  }

  start() {
    localStorage.setItem('user', JSON.stringify(this.UserService.user));
    this.router.navigateByUrl('/home');
  }

  animationRunner(event) {
    if (event.triggerName === 'logo' && event.fromState === 'in') {
      this.step.step = 0;
      this.step.ready = false;
    }
    else if (event.triggerName === 'logo') {
      this.step.ready = true;
    }
    else if (event.triggerName === 'form' && event.fromState === 'in') {
      this.step.ready = false;
      this.step.step = 1;
    }
    else if (event.triggerName === 'form' && event.fromState === 'out') {
      this.step.ready = true;
    }
    else if (event.triggerName === 'form' && event.fromState === 'void' && this.step.step === 1)
      this.evalConfig();
  }

  evalConfig() {
    this.config.reset();

    this.config.eval(this.UserService.user).then( () => {
    this.step.error = false;
    }).catch((answer) => {
      this.step.error = true;
    });
  }

  getToken() {
    return this.RequestService.getToken(this.UserService.user);
  }

  ngOnInit() {
    if (this.UserService.user && this.UserService.user.token && this.UserService.user.token.length > 10)
      this.router.navigateByUrl('/home');
  }
}








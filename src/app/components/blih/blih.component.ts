import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../service/request.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {BlihService} from '../../service/blih.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {SearchPipe} from '../../service/search.pipe';
import {RequestAnswer} from '../../model/RequestAnswer';
import {Repo} from '../../model/repo';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification.service';
import {notification} from '../../model/notification';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FADE_IN_ANNIMATION} from "../../animations/fade-in.animation";
import {ContributorsService} from "../../service/contributors.service";

@Component({
  selector: 'app-blih',
  templateUrl: './blih.component.html',
  styleUrls: ['./blih.component.css'],
  providers: [SearchPipe],
  animations: [
    FADE_IN_ANNIMATION
  ]
})
export class BlihComponent implements OnInit {
  user: User;
  repo = {
    error: false,
    data: []
  };
  page = {
    isLoading: true,
    ready: false,
  };
  @ViewChild('self') self: any;
  @ViewChild('input')
  input: ElementRef;

  constructor(private RequestService: RequestService, private userRequestService: UserService, private BlihService: BlihService, private router: Router, private Notif: NotificationService, private Contributors: ContributorsService) {
  }


  runAnimation(event) {
    if (event.toState === 'void')
    {
      setTimeout(() => {
        this.page.ready = true;
      }, 400);
    }
  }

  ngOnInit() {
    let self = this;
    const eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup');
    eventObservable.subscribe();

    this.BlihService.getRepo().then((answer: RequestAnswer) => {
      self.repo.data = answer._data;
      self.page.isLoading = false;
    }).catch((answer: RequestAnswer) => {
      self.router.navigateByUrl('/login');
      self.repo.data = ['Cannot reach server'];
      self.page.isLoading = false;
    });
  }
}

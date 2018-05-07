import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Route, Router} from '@angular/router';
import {RoutesInfoService} from './service/routes-info.service';
import {BlihService} from './service/blih.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(private Router: Router, public routeInfo: RoutesInfoService, public Blih: BlihService) {
    let self = this;

    this.Router.events.subscribe((event) => {
      self.routeInfo.update(event);
    });
  }


}

import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../service/request.service';
import {BlihService} from '../../service/blih.service';
import {Router} from '@angular/router';
import {FADE_IN_ANNIMATION} from "../../animations/fade-in.animation";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [FADE_IN_ANNIMATION]
})
export class SidebarComponent implements OnInit {

  constructor(private RequestService: RequestService, private BlihSerivce: BlihService, public Route: Router) {
  }

  ngOnInit() {
  }

  getMore() {
    if (this.BlihSerivce._selected)
      return true;
    return false;
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-breadcrumb',
  templateUrl: './user-breadcrumb.component.html',
  styleUrls: ['./user-breadcrumb.component.css']
})
export class UserBreadcrumbComponent implements OnInit {
  @Input() step: number;
  @Input() stepError = false;
  constructor() {
  }

  ngOnInit() {
  }

}

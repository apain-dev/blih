import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-breadcrumb',
  templateUrl: './user-breadcrumb.component.html',
  styleUrls: ['./user-breadcrumb.component.css']
})
export class UserBreadcrumbComponent implements OnInit {
  @Input() step: number;
  @Input() stepError = false;
  @Output() stepChange = new EventEmitter<number>();

  constructor() {
  }
  changeStep(newStep: number, event) {
    event.preventDefault();
    this.step = newStep;
    this.stepChange.emit(newStep);
  }
  ngOnInit() {
  }

}

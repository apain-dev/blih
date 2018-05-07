import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.css']
})
export class BreadcumbComponent implements OnInit {
  @Input() _error: boolean;
  @Input() _isWorking: boolean;
  @Input() _title: string;
  constructor() {
    this._error = false;
    this._isWorking = false;
  }

  ngOnInit() {
  }

}

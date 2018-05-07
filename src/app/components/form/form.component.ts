import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  model = {
    left: false,
    middle: false,
    right: false
  };
  @Output() access = new EventEmitter<object>();
  constructor(){

  }
  change() {
    this.access.next(this.model);
  }

  ngOnInit() {

  }
}

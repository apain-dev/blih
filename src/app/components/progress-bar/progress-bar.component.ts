import {Component, Input, OnInit} from '@angular/core';
import {Test} from '../../model/Test';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  providers: []
})
export class ProgressBarComponent implements OnInit{
  @Input() test: Test;
  helper = false;
  @Input() title = '';

  constructor() {
     }
  ngOnInit(){
  }

}

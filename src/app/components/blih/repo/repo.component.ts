import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RequestService} from '../../../service/request.service';
import {BlihService} from '../../../service/blih.service';
import {Router} from '@angular/router';
import {Repo} from '../../../model/repo';

@Component({
  selector: 'repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
  providers: []
})
export class RepoComponent {
  title = 'repo';
  @Input() repo: Repo;
  @Output() someEvent = new EventEmitter<object>();

  constructor(private RequestSerivce: RequestService,private BlihService: BlihService, private Router: Router){}

  changePage($event) {
    $event.preventDefault();
    this.BlihService.setSelected(this.repo);
    this.Router.navigateByUrl('/more');
  }
  clone() {
    this.BlihService.clone(this.repo);
  }
}

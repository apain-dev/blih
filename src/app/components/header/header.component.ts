import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {RequestService} from '../../service/request.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []
})
export class HeaderComponent implements OnInit {





  constructor(public userService: UserService, private Router: Router){
  }
  public notifData = {
    'infoMessage': [
      {
        'author': 'Ford',
        'content': 'Message example !'
      },
      {
        'author': 'Ford',
        'content': 'Message example !'
      },
      {
        'author': 'Ford',
        'content': 'Message example !'
      }
    ],
    'eventMessage': [
      {
        'author': 'Ford',
        'content': 'Message example !'
      },
      {
        'author': 'Ford',
        'content': 'Message example !'
      },
      {
        'author': 'Ford',
        'content': 'Message example !'
      }
    ],
    'privateMessage': [
      {
        'author': 'Ford',
        'content': 'Message example !'
      },
      {
        'author': 'Ford',
        'content': 'Message example !'
      },
      {
        'author': 'Ford',
        'content': 'Message example !'
      }
    ]
  };


  ngOnInit() {
    const self = this;
  }
  logOut(){
    this.userService.user = new User();
    this.Router.navigateByUrl('/login');
    localStorage.clear();
  }
}

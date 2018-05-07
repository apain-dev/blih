import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {RequestAnswer} from "../../model/RequestAnswer";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {notification} from "../../model/notification";
import {NotificationService} from "../../service/notification.service";
import {RequestService} from "../../service/request.service";
import {Router} from "@angular/router";
import {Contributor} from "../../model/Contributor";
import {ContributorsService} from "../../service/contributors.service";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-modal-contributors',
  templateUrl: './modal-contributors.component.html',
  styleUrls: ['./modal-contributors.component.scss'],
  providers: [ConfigService]
})
export class ModalContributorsComponent implements OnInit {
  modalRef: BsModalRef;
  contributors: Contributor;
  step = {
    step: 0,
    error: true
  };
  form: {
    part: number,
    logRequired: true
    error: {
      state: false,
      message: ''
    }
  };

  constructor(private modalService: BsModalService, private RequestService: RequestService, public UserService: UserService, private router: Router, private NotifService: NotificationService, private contributor: ContributorsService, private config: ConfigService) {
    this.step.step = 0;
    this.contributors = new Contributor();
    this.step.error = false;
  }

  openModal(template: TemplateRef<any>) {
    this.reset();
    this.config.reset();
    this.modalRef = this.modalService.show(template);
  }
  onSubmit() {
    const self = this;
    if ((this.contributor.contributors && this.contributor.contributors.find(mail => mail.user.mail === this.contributors.user.mail)) || this.contributors.user.mail === this.UserService.user.mail)
    {
      this.NotifService.warning(new notification('Contributors', this.contributors.user.mail + ' already exist'));
      this.reset();
      return;
    }
    this.getToken(this.contributors.user).then(function (answer: RequestAnswer) {

        self.contributors.user.token = answer._data;
        self.step.step = 1;
        self.evalConfig();
    }).catch(function (answer) {
      self.reset();
    });
  }

  start() {
    this.router.navigateByUrl('/home');
  }

  close() {
    this.modalRef.hide();
  }

  evalConfig() {
    this.config.reset();

    this.config.eval(this.contributors.user).then(() => {
      this.contributor.add(this.contributors);
      this.reset();
      this.modalRef.hide();
    });
  }

  getToken(user: User = null) {
    return this.RequestService.getToken(user);
  }

  reset() {
    this.config.reset();
    this.step.step = 0;
    this.contributors = new Contributor();
  }

  ngOnInit() {
    this.reset();
    this.config.reset();
  }

}

import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {RequestService} from '../../service/request.service';
import {Repo} from '../../model/repo';
import {RequestAnswer} from '../../model/RequestAnswer';
import {UserService} from '../../service/user.service';
import {NotificationService} from "../../service/notification.service";
import {notification} from "../../model/notification";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [RequestService]
})
export class ModalComponent {

  modalRef: BsModalRef;
  @Input() repo: Repo;
  @Output() newAcl = new EventEmitter<object>();
  form = {
    name: '',
    access: {
      left: false,
      middle: false,
      right: false
    }
  };

  constructor(private modalService: BsModalService, private RequestService: RequestService, private UserService: UserService, private Notify: NotificationService) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirmForm() {
    if (this.form.name.length === 0) {
      this.Notify.warning(new notification('Acl', 'You need to specify a user'));
    }
    else if (!this.form.access.left && !this.form.access.middle && !this.form.access.right) {
      this.Notify.warning(new notification('Acl', 'You need to add access'));
    }
    else {
      let self = this;

      this.RequestService.setAcl(this.UserService.user, this.form.name, this.repo, this.translateAccess()).then((answer: RequestAnswer) => {
        if (answer._status) {
          self.Notify.error(new notification('Acl', answer._data));
        } else {
          self.Notify.success(new notification('Acl', answer._data.message));
          self.newAcl.next({agent: self.form.name, access: self.translateAccess()});
        }
      }).catch((answer) => {
        self.Notify.error(new notification('Acl', answer._data));
      });
    }
  }

  updateAccess($event) {
    this.form.access = $event;
  }

  translateAccess(): string {
    let access = '';
    if (this.form.access.left)
      access += 'r';
    if (this.form.access.middle)
      access += 'w';
    if (this.form.access.right)
      access += 'a';
    return access;
  }

  close() {
    this.form.name = "";
    this.form.access = {
      left: false,
      middle: false,
      right: false
    };
    this.modalRef.hide();
  }
}

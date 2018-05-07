import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {RequestService} from '../../service/request.service';
import {Repo} from '../../model/repo';
import {RequestAnswer} from '../../model/RequestAnswer';
import {UserService} from '../../service/user.service';

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
    },
    error: {
      state: false,
      message: ''
    },
    success: {
      state: false,
      message: ''
    }
  };

  constructor(private modalService: BsModalService, private RequestService: RequestService, private UserService: UserService) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirmForm() {
    if (this.form.name.length === 0) {
      this.form.error.message = 'Please enter a user name';
      this.form.error.state = true;
    }
    else if (!this.form.access.left && !this.form.access.middle && !this.form.access.right) {
      this.form.error.message = 'Please select access';
      this.form.error.state = true;
    }
    else {
      this.form.error.message = '';
      this.form.error.state = false;
      let self = this;

      this.RequestService.setAcl(this.UserService.user, this.form.name, this.repo, this.form.access).then(function (answer: RequestAnswer) {
        if (answer._status) {
          self.form.error.state = true;
          self.form.error.message = answer._data;
        } else {
          self.form.success.state = true;
          self.form.success.message = answer._data;
          self.newAcl.next({agent: self.form.name, access: self.form.access});
        }
      }).catch(function (answer) {
        self.form.error.state = true;
        self.form.error.message = 'Cannot reach server';
      });

    }

  }

  updateAccess($event) {
    this.form.access = $event;
  }

  close() {
    this.modalRef.hide();
  }
}

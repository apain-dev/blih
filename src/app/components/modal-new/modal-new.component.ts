import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {RequestService} from '../../service/request.service';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Repo} from '../../model/repo';
import {NotificationService} from '../../service/notification.service';
import {notification} from '../../model/notification';
import {ToastData} from 'ng2-toasty';
import {RequestAnswer} from '../../model/RequestAnswer';
import {daLocale} from 'ngx-bootstrap';
import {UserService} from '../../service/user.service';
import {BlihService} from '../../service/blih.service';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.css']
})
export class ModalNewComponent implements OnInit {

  modalRef: BsModalRef;
  repo: Repo = new Repo();

  constructor(private modalService: BsModalService, private RequestService: RequestService, private Notify: NotificationService, private User: UserService, private Blih: BlihService) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {
  }

  confirmForm() {
    if (this.repo.name.length > 2) {

      let self = this;
      let id;
      this.Notify.waiting(new notification('New Repository', 'Creating ' + this.repo._name), null, (toast: ToastData) => {
        id = toast.id;
      });
      // noinspection TypeScriptValidateTypes
      this.RequestService.create(this.User.user, this.repo).then((answer: RequestAnswer) => {
        if (!answer._status)
        {
          self.Blih.getRepo(true).then((answer: RequestAnswer) => {
            self.Notify.toastyService.clear(id);
            self.Notify.success(new notification('New Repository', self.repo._name + ' created'));
          });
        }
        else
        {
          self.Notify.toastyService.clear(id);
          self.Notify.error(new notification('New Repository', 'Error: ' + this.repo.name + ' ' + answer._data));
        }
      });
    }
    else {
      this.Notify.warning(new notification('New Repository', 'Enter a valida name'));
    }
  }

  close() {
    this.modalRef.hide();
  }
}


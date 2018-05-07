import {Injectable} from '@angular/core';
import {ToastData, ToastOptions, ToastyConfig, ToastyService} from 'ng2-toasty';
import {notification} from '../model/notification';

@Injectable()

export class NotificationService {
  private _notifications: notification[];
  private _config: ToastOptions;

  constructor(public toastyService: ToastyService, private toastyConfig: ToastyConfig) {
   this.reset();
  }

  success(notif: notification, closeCallback = null) {
    this.reset();
    this._config.title = notif.title;
    this._config.msg = notif.core;
    if (closeCallback)
      this._config.onRemove = closeCallback;
    this.toastyService.success(this._config);
  }

  warning(notif: notification, closeCallback = null) {
    this.reset();
    this._config.title = notif.title;
    this._config.msg = notif.core;
    if (closeCallback)
      this._config.onRemove = closeCallback;
    this.toastyService.warning(this._config);
  }

  error(notif: notification, closeCallback = null) {
    this.reset();
    this._config.title = notif.title;
    this._config.msg = notif.core;
    if (closeCallback)
      this._config.onRemove = closeCallback;
    this.toastyService.error(this._config);
  }

  info(notif: notification, closeCallback = null) {
   this.reset();
    this._config.title = notif.title;
    this._config.msg = notif.core;
    if (closeCallback)
      this._config.onRemove = closeCallback;
    this.toastyService.info(this._config);
  }

  waiting(notif: notification, closeCallback = null, addCallbackk = null) {
    this.reset();
    this._config.title = notif.title;
    this._config.msg = notif.core;
    if (closeCallback)
      this._config.onRemove = closeCallback;
    if (addCallbackk)
      this._config.onAdd = addCallbackk;
    this._config.timeout = 500000;
    this.toastyService.wait(this._config);
  }

  reset() {
    this._config = {
      title: '',
      msg: '',
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap',
      onAdd: (toast: ToastData) => {
      },
      onRemove: function (toast: ToastData) {
      }
    };
  }
  get notifications(): notification[] {
    return this._notifications;
  }
}

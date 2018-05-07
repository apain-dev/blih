export class RequestAnswer {
  _data;
  _status;
  constructor(status, data) {
    this._status = status;
    this._data = data;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }
}

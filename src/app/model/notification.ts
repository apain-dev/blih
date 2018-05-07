export class notification {
  constructor(private _title: string, private _core: string, private _icon: string = '') {
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get core(): string {
    return this._core;
  }

  set core(value: string) {
    this._core = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }
}

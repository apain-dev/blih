export class Test {
  private _error: boolean;
  private _type: string;
  private _percent: number;
  private _answer: any;


  constructor() {
    this._type = 'warning';
    this._percent = 10;
    this._error = false;
    this._answer = '';
  }


  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get percent(): number {
    return this._percent;
  }

  set percent(value: number) {
    this._percent = value;
  }

  get answer(): any {
    return this._answer;
  }

  set answer(value) {
    this._answer = value;
  }
}

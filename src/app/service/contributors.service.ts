import { Injectable } from '@angular/core';
import {Contributor} from "../model/Contributor";

@Injectable()
export class ContributorsService {
  private _contributors: Contributor[] = [];

  constructor() {
    let contributors = localStorage.getItem('contributors');
    let contributorsArray: Contributor[] = [];
    if (contributors && contributors.length > 0) {
      try {
       contributorsArray = JSON.parse(contributors);
       for (const i in contributorsArray)
       {
         this._contributors.push(new Contributor());
         this._contributors[i].copy(contributorsArray[i]._user, contributorsArray[i]._shared, contributorsArray[i]._isEnable, contributorsArray[i]._color);
       }
      }
      catch (e) {
        this._contributors = [];
        console.log(e);
      }
    }
  }

  add(contributors: Contributor) {
    this._contributors.push(contributors);
    localStorage.setItem('contributors', JSON.stringify(this._contributors));
  }

  remove(contributors: Contributor) {
    for (let i in this._contributors) {
      if (this.contributors[i].user.mail === contributors.user.mail)
      {
        this._contributors.splice(parseInt(i));
        break;
      }
    }
    localStorage.setItem('contributors', JSON.stringify(this._contributors));
  }

  set contributors(value: Contributor[]) {
    this._contributors = value;
  }

  get contributors(): Contributor[] {
    return this._contributors;
  }
  save() {
    localStorage.setItem('contributors', JSON.stringify(this._contributors));
  }
}

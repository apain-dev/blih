import {Injectable} from '@angular/core';
import {AppRoutesInfo} from '../model/Routes';
import {NavigationEnd} from '@angular/router';

@Injectable()
export class RoutesInfoService {
  private _map: AppRoutesInfo[] = [];
  private _active: AppRoutesInfo;

  constructor() {
    this._active = new AppRoutesInfo('', '', '');
    this.map.push(new AppRoutesInfo('login', 'sign-in', 'Tell us a little bit more'));
    this.map.push(new AppRoutesInfo('home', 'home', 'repository'));
    this.map.push(new AppRoutesInfo('user', 'user', 'Update user\'s informations'));
    this.map.push(new AppRoutesInfo('more', 'info', 'Information about'));
    this.map.push(new AppRoutesInfo('contributors', 'github-square', 'Contributors from epitech'));
  }

  update(event) {
    let self = this;

    if (event instanceof NavigationEnd) {
      for (let i in self._map) {
        if (self._map[i].path === event.url.replace('/', '')) {
          this._active = self._map[i];
          break;
        }
      }
    }
  }

  get map(): AppRoutesInfo[] {
    return this._map;
  }

  set map(value: AppRoutesInfo[]) {
    this._map = value;
  }

  get active(): AppRoutesInfo {
    return this._active;
  }

  set active(value: AppRoutesInfo) {
    this._active = value;
  }
}

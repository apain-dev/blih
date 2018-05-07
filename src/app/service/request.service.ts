import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {User} from '../model/user';
import {Repo} from '../model/repo';
import {saveAs, importSaveAs} from 'file-saver/FileSaver';
import {Contributor} from '../model/Contributor';
import {RequestAnswer} from '../model/RequestAnswer';
import {a} from '@angular/core/src/render3';


@Injectable()
export class RequestService {
  _baseUrl;
  _config;

  constructor(private http: HttpClient) {
    this._baseUrl = 'http://api.battoire.fr/';
    this._config = {
      headers: {'Content-type': 'application/json'},
      'dataType': 'json'
    };
  }

  getList(user): Promise<any> {
    return this.http.post<any>(this._baseUrl + 'blih/list', {user: user}, this._config).toPromise();
  }

  getAcl(user, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/getAcl', {'repo': repo, 'user': user}, this._config).toPromise();
  }

  setAcl(user: User, userToAdd: string, repo: Repo, access: object): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/setAcl', {
      'repo': repo,
      'user': user,
      'target': userToAdd,
      'access': access
    }, this._config).toPromise();
  }

  getInfo(repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/getInfo', {'repo': repo}, this._config).toPromise();
  }

  clone(user: User, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/clone', {'repo': repo, user: user}, this._config).toPromise();
  }

  getFile(user: User, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/getFile', {'repo': repo, user: user}, this._config).toPromise();
  }

  create(user: User, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/create', {'repo': repo, 'user': user}, this._config).toPromise();
  }

  whoAmI(user: User): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/whoami', {user: user}, this._config).toPromise();
  }

  getToken(user: User): Promise<any> {
    return this.http.post(this._baseUrl + 'ssh/token', {user: user}, this._config).toPromise();
  }

  trySsh(user: User): Promise<any> {
    return this.http.post(this._baseUrl + 'ssh/try', {user: user}, this._config).toPromise();
  }

  contributor(contributor: User, user: User): Promise<any> {
    return this.http.post(this._baseUrl + 'contributor/enable', {contributor: contributor, activeUser: user}, this._config).toPromise();
  }

  saveFile(repo: Repo) {
    window.location.href = 'http://api.battoire.fr/blih/getFile/' + repo._name;
  }

}

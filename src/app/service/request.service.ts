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
    this._baseUrl = 'http://localhost:8080/';
    this._config = {
      headers: {'Content-type': 'application/json'},
      'dataType': 'json'
    };
  }

  /**
   *
   * @param {User} user
   * @returns {Promise<RequestAnswer>}
   */

  getList(user: User): Promise<any> {
    return this.http.post<any>(this._baseUrl + 'repository/list', {user: user}, this._config).toPromise();
  }

  /**
   *
   * @param {User} user
   * @param {Repo} repo
   * @returns {Promise<RequestAnswer>}
   */
  getAcl(user: User, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'repository/getAcl', {'repo': repo, 'user': user}, this._config).toPromise();
  }

  /**
   *
   * @param {User} user
   * @param {string} userToAdd
   * @param {Repo} repo
   * @param {string} access
   * @returns {Promise<any>}
   * @example setAcl({token:"your token"}, "user@epitech.eu", {name: "target repo"}, "rw");
   */
  setAcl(user: User, userToAdd: string, repo: Repo, access: string): Promise<any> {
    return this.http.post(this._baseUrl + 'repository/setAcl', {
      'repo': repo,
      'user': user,
      'target': userToAdd,
      'access': access
    }, this._config).toPromise();
  }

  /**
   *
   * @param {User} user
   * @param {Repo} repo
   * @returns {Promise<RequestAnswer>}
   */
  getInfo(user:User, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'repository/info', {'repo': repo, 'user': user}, this._config).toPromise();
  }

  /**
   *
   * @param {User} user
   * @param {Repo} repo
   * @returns {Promise<any>}
   */
  clone(user: User, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'repository/clone', {'repo': repo, user: user}, this._config).toPromise();
  }

  /**
   *
   * @param {User} user
   * @param {Repo} repo
   * @returns {Promise<RequestAnswer>}
   */
  create(user: User, repo: Repo): Promise<any> {
    return this.http.post(this._baseUrl + 'repository/create', {'repo': repo, 'user': user}, this._config).toPromise();
  }

  whoAmI(user: User): Promise<any> {
    return this.http.post(this._baseUrl + 'blih/whoami', {user: user}, this._config).toPromise();
  }

  /**
   *
   * @param {User} user
   * @returns {Promise<any>}
   */
  getToken(user: User): Promise<any> {
    return this.http.post(this._baseUrl + 'ssh/token', {user: user}, this._config).toPromise();
  }

  /**
   *
   * @param {User} contributor
   * @param {User} user
   * @returns {Promise<any>}
   */
  contributor(contributor: User, user: User): Promise<any> {
    return this.http.post(this._baseUrl + 'contributor/enable', {contributor: contributor, activeUser: user}, this._config).toPromise();
  }

  /**
   *
   * @param {Repo} repo
   */
  saveFile(repo: Repo) {
    window.location.href = this._baseUrl + 'repository/getFile/' + repo.name;
  }

}

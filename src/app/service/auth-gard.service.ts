import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router, private User: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = false; // ... your login logic here
    if (this.User.user &&  this.User.user.token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

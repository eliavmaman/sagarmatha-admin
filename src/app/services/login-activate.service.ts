import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './users.service';
import {CanActivate} from '@angular/router';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateService implements CanActivate {

  constructor(private service: UsersService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.service.getCurrentUser()) {
      this.router.navigate(['']);
    }
    return true;
  }
}

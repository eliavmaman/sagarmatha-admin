import {Injectable} from '@angular/core';
import {User} from '../Models/User';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base-service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  currentUser: User;
  onUserLogged = new Subject<boolean>();

  constructor(private http: HttpClient) {
    super();
  }

  setCurrentUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  getCurrentUser() {
    const founded = sessionStorage.getItem('user');
    if (founded) {
      this.currentUser = JSON.parse(founded);
      return this.currentUser;
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.currentUser = null;
  }

  auth(email: string): Observable<User> {
    return this.http.post<User>(this.bastAPI + 'auth', {email: email}).map((res: User) => {
      this.setCurrentUser(res);
      this.onUserLogged.next();
      return res;
    });
  }

  getAll(id, role): Observable<User[]> {
    return this.http.post<User[]>(this.bastAPI + `users/${id}/all`, {role: role});
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.bastAPI + 'users', user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.bastAPI + 'users/' + user._id, user);
  }

  delete(user: User): Observable<boolean> {
    return this.http.delete<boolean>(this.bastAPI + 'users/' + user._id);
  }
}

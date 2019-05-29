import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged = false;


  constructor(private service: UsersService, private router: Router) {
    this.service.onUserLogged.subscribe(() => {
      this.isLogged = true;

    });
  }

  get username() {
    return `HELLO ${this.service.currentUser.email} (${this.service.currentUser.role})`;
  }

  ngOnInit() {

    this.isLogged = this.service.getCurrentUser() != null;
  }

  logout() {
    this.service.logout();
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}

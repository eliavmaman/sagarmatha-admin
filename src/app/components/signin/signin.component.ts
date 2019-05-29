import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../Models/User';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email = '';

  constructor(private service: UsersService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  signin() {
    this.service.auth(this.email).subscribe((res: User) => {
      this.service.setCurrentUser(res);

      this.router.navigate(['users']);
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {User} from '../../Models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Output() onedit: EventEmitter<any> = new EventEmitter();
  @Output() ondelete: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  edit() {
    this.onedit.emit(this.user);
  }


  delete() {
    this.ondelete.emit(this.user);
  }
}

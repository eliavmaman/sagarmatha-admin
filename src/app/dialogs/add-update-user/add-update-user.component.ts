import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {BsModalService} from 'ngx-bootstrap';
import {ViewChild} from '@angular/core';


import * as moment from 'moment';
import {User} from '../../Models/User';
import {UsersService} from '../../services/users.service';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';


@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {
  userModel: User;
  mode;
  modalRef: BsModalRef;
  btnText = 'Create';
  isFormSubmited = false;
  @ViewChild('modal') modal: TemplateRef<any>;
  @Output() action = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor(private modalService: BsModalService) {
    if (!this.userModel) {
      this.userModel = new User();
      this.userModel.role = 'customer';
      this.userModel.role = 'customer';
    }
  }

  ngOnInit() {
  }

  saveOrUpdate(isValid: boolean) {
    this.isFormSubmited = true;
    if (!isValid) {
      return;
    }

    this.mode === 'edit' ?
      this.action.emit({action: 'update', user: this.userModel}) :
      this.action.emit({action: 'create', user: this.userModel});
  }

  close() {
    this.onClose.emit();
  }
}

import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {BsModalService} from 'ngx-bootstrap';
import {ViewChild} from '@angular/core';


import * as moment from 'moment';
import {User} from '../../Models/User';
import {UsersService} from '../../services/users.service';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Order} from '../../Models/Order';


@Component({
  selector: 'app-add-update-order',
  templateUrl: './add-update-order.component.html',
  styleUrls: ['./add-update-order.component.css']
})
export class AddUpdateOrderComponent implements OnInit {
  orderModel: Order;
  mode;
  modalRef: BsModalRef;
  btnText = 'Create';
  isFormSubmited = false;
  @ViewChild('modal') modal: TemplateRef<any>;
  @Output() action = new EventEmitter();
  @Output() onclose = new EventEmitter();


  constructor() {
    if (!this.orderModel) {
      this.orderModel = new Order();
      this.orderModel.store = 'Tesco';
      this.orderModel.created = new Date();
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
      this.action.emit({action: 'update', order: this.orderModel}) :
      this.action.emit({action: 'create', order: this.orderModel});
  }

  close() {
    this.onclose.emit();
  }


}

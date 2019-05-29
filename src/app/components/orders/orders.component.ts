import {Component, OnInit} from '@angular/core';
import {Order} from '../../Models/Order';
import {OrdersService} from '../../services/orders.service';
import {ModalOptions} from 'ngx-bootstrap';
import {BsModalService} from 'ngx-bootstrap';
import {AddUpdateOrderComponent} from '../../dialogs/add-update-order/add-update-order.component';
import {ViewChild} from '@angular/core';
import {NotificationsComponent} from '../../dialogs/notifications/notifications.component';
import {ConfirmationModalComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import * as moment from 'moment';
import {UsersService} from '../../services/users.service';
import {Route} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  @ViewChild('notification') notification: NotificationsComponent;
  @ViewChild('confirm1') confirm: ConfirmationModalComponent;
  orders: Order[] = [];
  alertType: string;
  alertMessage: string;
  alertClass: string;
  orderToDelete: Order;
  currentUserId = '';

  constructor(
    private usersService: UsersService,
    private service: OrdersService,
    private modalService: BsModalService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUserId = this.route.snapshot.paramMap.get('id');
    this.service.getAll(this.currentUserId, this.usersService.currentUser.role).subscribe((res: Order[]) => {
      this.orders = res;
    });
  }

  ngAfterViewInit() {
    this.confirm.onClose.subscribe(result => {
      if (result === true) {
        this.service.delete(this.orderToDelete).subscribe(() => {
          this.alertMessage = 'Order deleted successfully';
          this.setNotification(null);
          this.ngOnInit();
        });
      }
    });
  }

  openModal() {
    const state: ModalOptions = new ModalOptions();
    state.initialState = {btnText: 'Create', mode: 'new'};
    const bsModalRef = this.modalService.show(AddUpdateOrderComponent);
    bsModalRef.content.onclose.subscribe(() => {
      bsModalRef.hide();
    });
    this.saveUpdateHendler(bsModalRef);
  }

  setNotification(error: any) {
    this.alertClass = error ? 'alert-danger' : 'alert-success';
    this.alertType = error ? 'Error' : 'Success';
    this.alertMessage = error || 'User saved successfully';

  }

  delete(order: Order) {

    this.orderToDelete = order;
    this.confirm.showConfirmationModal('Are you sure?', 'order will be deleted for ever!');
  }

  edit(order: Order) {
    const assignedOrder = Object.assign({}, order);
    assignedOrder.created = new Date(order.created);
    const state: ModalOptions = new ModalOptions();
    state.initialState = {orderModel: assignedOrder, btnText: 'Update', mode: 'edit'};
    const bsModalRef = this.modalService.show(AddUpdateOrderComponent, {initialState: state.initialState});
    bsModalRef.content.onclose.subscribe(() => {
      bsModalRef.hide();
    });
    this.saveUpdateHendler(bsModalRef);
  }

  calcDiscount(order: Order) {
    if (order.discount > 0) {
      return (order.total - (order.total / 100) * order.discount).toFixed(2);
    }
    return order.total;
  }

  private saveUpdateHendler(bsModalRef) {
    bsModalRef.content.action.subscribe((value) => {
      switch (value.action) {
        case 'update':
          this.service.update(value.order).subscribe((res: Order) => {
            this.ngOnInit();
            this.setNotification(null);
            this.notification.show();
          }, (err: any) => {
            this.setNotification(err);
            this.notification.show();
          });
          break;
        case 'create':
          value.order.user = this.currentUserId;
          this.service.create(value.order).subscribe((res: Order) => {
            this.ngOnInit();
            this.notification.show();
          });
          break;
      }

      bsModalRef.hide();
    });
  }

  get isAllowAdd() {
    return this.usersService.currentUser.role === 'admin';
  }

}

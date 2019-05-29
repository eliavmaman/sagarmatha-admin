import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../Models/User';
import {ViewChild} from '@angular/core';
import {AddUpdateUserComponent} from '../../dialogs/add-update-user/add-update-user.component';
import {NotificationsComponent} from '../../dialogs/notifications/notifications.component';
import {ConfirmationModalComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {BsModalService} from 'ngx-bootstrap';
import {ModalOptions} from 'ngx-bootstrap';
import {AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('addUpdateModal') addUpdateModal: AddUpdateUserComponent;
  @ViewChild('notification') notification: NotificationsComponent;
  @ViewChild('confirm1') confirm: ConfirmationModalComponent;
  users = [];
  alertType: string;
  alertMessage: string;
  alertClass: string;
  userToDelete: User;

  constructor(private service: UsersService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.service.getAll(this.service.currentUser._id, this.service.currentUser.role).subscribe((res: User[]) => {
      this.users = res;
    });
  }

  ngAfterViewInit() {
    this.confirm.onClose.subscribe(result => {
      if (result === true) {
        this.service.delete(this.userToDelete).subscribe(() => {
          this.alertMessage = 'User deleted successfully';
          this.setNotification(null);

        });
      }
    });
  }

  get isAllowAdd() {
    return this.service.currentUser.role === 'admin';
  }

  setNotification(error: any) {
    this.alertClass = error ? 'alert-danger' : 'alert-success';
    this.alertType = error ? 'Error' : 'Success';
    this.alertMessage = error || 'User saved successfully';
  }

  ondelete(user: User) {
    this.confirm.showConfirmationModal('Are you sure?', 'delete ' + user.name + '?');
  }

  onedit(user: User) {
    const state: ModalOptions = new ModalOptions();
    state.initialState = {userModel: Object.assign({}, user), btnText: 'Update', mode: 'edit'};
    const bsModalRef = this.modalService.show(AddUpdateUserComponent, {initialState: state.initialState});
    bsModalRef.content.onClose.subscribe(() => {
      bsModalRef.hide();
    });
    this.saveUpdateHendler(bsModalRef);
  }

  openModal() {
    const state: ModalOptions = new ModalOptions();
    state.initialState = {btnText: 'Create', mode: 'new'};
    const bsModalRef = this.modalService.show(AddUpdateUserComponent);
    bsModalRef.content.onClose.subscribe(() => {
      bsModalRef.hide();
    });
    this.saveUpdateHendler(bsModalRef);
  }

  private saveUpdateHendler(bsModalRef) {
    bsModalRef.content.action.subscribe((value) => {
      switch (value.action) {
        case 'update':
          this.service.update(value.user).subscribe((res: User) => {
            this.ngOnInit();
            this.setNotification(null);
            this.notification.show();
          }, (err: any) => {
            this.setNotification(err);
            this.notification.show();
          });
          break;
        case 'create':
          this.service.create(value.user).subscribe((res: User) => {
            this.ngOnInit();
            this.notification.show();
          });
          break;
      }

      bsModalRef.hide();
    });
  }
}

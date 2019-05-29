import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersComponent} from './components/users/users.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {UserComponent} from './components/user/user.component';
import {OrdersComponent} from './components/orders/orders.component';
import {OrdersService} from './services/orders.service';
import {ModalModule} from 'ngx-bootstrap';
import {UsersService} from './services/users.service';
import {AddUpdateUserComponent} from './dialogs/add-update-user/add-update-user.component';
import {NotificationsComponent} from './dialogs/notifications/notifications.component';
import {ConfirmationModalComponent} from './dialogs/confirmation-dialog/confirmation-dialog.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AddUpdateOrderComponent} from './dialogs/add-update-order/add-update-order.component';
import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AnalisysComponent } from './components/analisys/analisys.component';
import { SigninComponent } from './components/signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    UserComponent,
    OrdersComponent,
    AddUpdateUserComponent,
    NotificationsComponent,
    ConfirmationModalComponent,
    AddUpdateOrderComponent,
    PieChartComponent,
    AnalisysComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule, CommonModule,
    A2Edatetimepicker,
    BsDatepickerModule.forRoot(),
    ChartsModule
  ],
  providers: [OrdersService, UsersService],
  entryComponents: [AddUpdateUserComponent, AddUpdateOrderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

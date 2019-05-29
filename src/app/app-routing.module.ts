import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {OrdersComponent} from './components/orders/orders.component';
import {AnalisysComponent} from './components/analisys/analisys.component';
import {SigninComponent} from './components/signin/signin.component';
import {LoginActivateService} from './services/login-activate.service';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'users', component: UsersComponent, canActivate: [LoginActivateService]},
  {path: 'orders/:id', component: OrdersComponent, pathMatch: 'full', canActivate: [LoginActivateService]},
  {path: 'analysis/:id', component: AnalisysComponent, pathMatch: 'full', canActivate: [LoginActivateService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

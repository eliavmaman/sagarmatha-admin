import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Order} from '../Models/Order';
import {BaseService} from './base-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(id, role): Observable<Order[]> {
    return this.http.post<Order[]>(this.bastAPI + `users/${id}/orders`, {role: role});
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.bastAPI + 'Orders', order);
  }

  update(order: Order): Observable<Order> {
    return this.http.put<Order>(this.bastAPI + 'Orders/' + order._id, order);
  }

  delete(order: Order): Observable<boolean> {
    return this.http.delete<boolean>(this.bastAPI + 'Orders/' + order._id);
  }


}

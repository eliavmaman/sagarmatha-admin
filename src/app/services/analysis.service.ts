import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../Models/User';
import {BaseService} from './base-service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getOrdersPerDay(id) {
    return this.http.get(this.bastAPI + `users/${id}/ordersperday`);
  }
}

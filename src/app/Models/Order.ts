import {User} from './User';

export class Order {
  _id: string;
  total: number;
  discount: number;
  store: string;
  created: Date;
  user: User;
}


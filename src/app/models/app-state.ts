import { Order } from './order'
import{ StoreDetails } from './store-details'
import{ StoreItems } from './store-items'

export interface AppStateModel{
  username: string;
  stores: StoreDetails[];
  orders: Order[];
  items: StoreItems[];
  cart?: string[];
  status?: 'pending' | 'confirmed' | 'declined';
}
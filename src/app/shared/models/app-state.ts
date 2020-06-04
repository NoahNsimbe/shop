import { Order } from './order'
import{ StoreDetails } from './store-details'
import{ StoreItem } from './store-items'

export interface AppStateModel{
  username: string;
  stores: StoreDetails[];
  orders: Order[];
  items: StoreItem[];
  cart?: string[];
  status?: 'pending' | 'confirmed' | 'declined';
}
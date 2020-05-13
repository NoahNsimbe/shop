import { StoreItem } from './store-items';

export interface Order {
    address: string;
    order_time: Date;
    amount: number;
    items: OrderItem[];
    status?: string;
  }

  export interface CartItem {
    item: StoreItem;
    quantity: number;
  }

  export interface OrderItem{
      item_id: string;
      quantity: number;
  }

  export interface Locations{
    districts: string[];
    regions: string[];
    }

export interface Districts{
    districts: string[];
    }

export interface Regions{
    regions: string[];
    }
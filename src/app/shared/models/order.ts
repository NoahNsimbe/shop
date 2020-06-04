import { StoreItem } from './store-items';

export interface Order {
    order_id: string;
    address: string;
    order_time: string;
    amount: number;
    // products: OrderItem[];
    products: any;
    status?: string;
    delivery_agent?: string;
    delivery_time?: Date;
    send_email?:boolean;
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
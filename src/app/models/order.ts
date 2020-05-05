export interface Order {
    address: string;
    order_time: Date;
    amount: Float64Array;
    items: OrderItem[];
  }

  export interface OrderItem{
      item_id: string;
      quantity: string;
  }
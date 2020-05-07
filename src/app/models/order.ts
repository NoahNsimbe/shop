export interface Order {
    address: string;
    order_time: Date;
    amount: Float64Array;
    items: OrderItem[];
    status?: string;
  }

  export interface OrderItem{
      item_id: string;
      quantity: number;
  }
import { StoreItem } from './store-items';

export interface Cart {
    store: null;
    item: StoreItem;
    quantity: number;
    subtotal: number;
}

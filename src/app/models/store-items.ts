export interface StoreItems {
  item_id: string;
  store: string;
  name: string;
  unit_price: number;
  category: string;
  image?: string;
  brand?: string;
  description?: string;
  key_features?: string[];
  specifications?: string[];
  sub_category?: string;
}

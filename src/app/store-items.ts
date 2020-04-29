export interface StoreItems {
  id: string;
  store: string;
  name: string;
  unitPrice: string;
  category: string;
  image: string;
  brand: string;
  description?: string[];
  keyFeatures?: string[];
  specifications?: string[];
  subCategory?: string;
}

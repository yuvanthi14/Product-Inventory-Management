import { Product } from "./product.model";


export interface ProductCategory {
  id: number;
  name: string;
  products: Product[];
}

import { CartProduct } from './CartProduct.dto';

export class ResponseCreateOrder {
  order: {
    id: number;
    userId: number;
    total: number;
    created_at: Date;
    updated_at: Date;
  };

  orderProducts: CartProduct[];
}

import { ResponseOrderProductDto } from './ResponseOrderProduct.dto';

export class ResponseOrderDto {
  id: number;
  userId: number;
  total: number;
  products: ResponseOrderProductDto[];
  created_at: Date;
  updated_at: Date;
}

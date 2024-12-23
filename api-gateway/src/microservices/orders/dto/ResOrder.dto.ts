import { ResOrderProductDto } from './ResOrderProduct.dto';

export class ResOrderDto {
  id: number;
  userId: number;
  total: number;
  products: ResOrderProductDto[];
  created_at: Date;
  updated_at: Date;
}

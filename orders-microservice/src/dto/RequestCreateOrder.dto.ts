import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderProductsDto } from './OrderProducts.dto';

export class RequestCreateOrder {
  @IsArray()
  products: OrderProductsDto[];

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

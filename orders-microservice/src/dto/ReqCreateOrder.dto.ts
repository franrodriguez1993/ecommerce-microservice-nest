import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderProductsDto } from './OrderProducts.dto';

export class ReqCreateOrderDto {
  @IsArray()
  products: OrderProductsDto[];

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

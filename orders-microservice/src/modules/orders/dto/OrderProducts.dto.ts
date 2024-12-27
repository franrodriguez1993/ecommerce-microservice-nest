import { IsNumber, IsString } from 'class-validator';

export class OrderProductsDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderProductsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

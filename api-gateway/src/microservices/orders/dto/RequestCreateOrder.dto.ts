import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderProductsDto } from './OrderProducts.dto';

export class RequestCreateOrder {
  @ApiProperty({
    type: OrderProductsDto,
    isArray: true,
    items: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        quantity: { type: 'number' },
      },
    },
  })
  @ValidateNested({ each: true })
  @Type(() => OrderProductsDto)
  products: OrderProductsDto[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

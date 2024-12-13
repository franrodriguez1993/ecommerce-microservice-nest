import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { RequestCreateOrder } from './dto/RequestCreateOrder.dto';
import { ResponseCreateOrder } from './dto/ResponseCreateOrder.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @ApiOperation({ description: 'Create a new order' })
  async createOrder(
    @Body() dto: RequestCreateOrder,
  ): Promise<{ statusCode: HttpStatus; result: ResponseCreateOrder }> {
    const order = await this.orderService.createOrder(dto);

    return { statusCode: HttpStatus.CREATED, result: order };
  }
}

import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';
import { RequestCreateOrder } from '../../dto/RequestCreateOrder.dto';
import { ResponseCreateOrder } from '../../dto/ResponseCreateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(dto: RequestCreateOrder): Promise<ResponseCreateOrder> {
    return await this.orderService.createOrder(dto);
  }
}

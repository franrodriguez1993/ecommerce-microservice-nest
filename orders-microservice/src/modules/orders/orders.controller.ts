import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';
import { ReqCreateOrderDto } from './dto/ReqCreateOrder.dto';
import { ResOrderDto } from './dto/ResOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(dto: ReqCreateOrderDto): Promise<ResOrderDto> {
    return await this.orderService.createOrder(dto);
  }

  @MessagePattern({ cmd: 'get_by_id_order' })
  async getOrderById(id: number): Promise<ResOrderDto> {
    return await this.orderService.getOrderById(id);
  }

  @MessagePattern({ cmd: 'get_user_orders' })
  async getUserOrders(body: { userId: number; offset: number; limit: number }) {
    return await this.orderService.getUserOrders(
      body.userId,
      body.offset,
      body.limit,
    );
  }
}

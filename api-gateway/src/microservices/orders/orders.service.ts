import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { ReqCreateOrderDto } from './dto/ReqCreateOrder.dto';
import { firstValueFrom } from 'rxjs';
import { OrderKafka } from './dto/OrderKafka.dto';
import { OrderAction } from './enum/order-action.enum';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_MICROSERVICE') private readonly client: ClientProxy,
    @Inject('ORDER_LOG_SERVICE') private readonly kafkaClient:ClientKafka
  ) {}

  async createOrder(dto: ReqCreateOrderDto) {
    const order = await firstValueFrom(this.client.send({ cmd: 'create_order' }, dto));
    if (order) {
      this.kafkaMessage({ action: OrderAction.CREATED, orderId: order.id,userId:order.userId });
    }
    return order;
  }

  async getById(id: number) {
    return await firstValueFrom(
      this.client.send({ cmd: 'get_by_id_order' }, id),
    );
  }

  async getUserOrders(userId: number, offset: number, limit: number) {
    return await firstValueFrom(
      this.client.send({ cmd: 'get_user_orders' }, { userId, offset, limit }),
    );
  }

  private kafkaMessage(data:OrderKafka) {
    this.kafkaClient.emit("order_action", data);
  }
}

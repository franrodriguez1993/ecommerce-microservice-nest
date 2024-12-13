import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestCreateOrder } from './dto/RequestCreateOrder.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async createOrder(dto: RequestCreateOrder) {
    return await firstValueFrom(this.client.send({ cmd: 'create_order' }, dto));
  }
}

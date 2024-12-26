import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProviderService {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly userClient: ClientProxy,
    @Inject('ORDERS_MICROSERVICE')
    private readonly orderClient: ClientProxy,
  ) {}

  /* ORDERS */

  async getOrderById(id: number) {
    return await firstValueFrom(
      this.orderClient.send({ cmd: 'get_by_id_order' }, id),
    );
  }

  /* USERS */

  async getUserById(id: number) {
    return await firstValueFrom(
      this.userClient.send({ cmd: 'get_by_id_user' }, id),
    );
  }

  /* ADDRESS */

  async getAddressById(id: number) {
    return await firstValueFrom(
      this.userClient.send({ cmd: 'get_by_id_address' }, id),
    );
  }
}

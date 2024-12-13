import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProviderService {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly userClient: ClientProxy,
    @Inject('PRODUCTS_MICROSERVICE')
    private readonly productClient: ClientProxy,
  ) {}

  /* PRODUCTS */

  async getProductById(id: string) {
    return await firstValueFrom(
      this.productClient.send({ cmd: 'find_by_id_product' }, id),
    );
  }

  /* USERS */

  async getUserById(id: number) {
    return await firstValueFrom(
      this.userClient.send({ cmd: 'get_by_id_user' }, id),
    );
  }
}

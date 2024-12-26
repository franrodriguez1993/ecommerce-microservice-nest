import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ReqCreateShippingDto } from "./dto/reqCreateShipping.dto";
import { ShippingStatus } from "./enum/shipping-status.enum";

@Injectable()
export class ShippingService {

  constructor(@Inject('SHIPPING_MICROSERVICE') private readonly client: ClientProxy) { }
  
    async createShipping(dto: ReqCreateShippingDto) {
      return await firstValueFrom(
        this.client.send({ cmd: 'create_shipping' }, dto),
      );
  }
  
  async getShippingById(id: number) {
    return await firstValueFrom(
        this.client.send({ cmd: 'get_by_id_shipping' }, id),
      );
  }

  async updateShippingStatus(id: number, status: ShippingStatus) {
        return await firstValueFrom(
        this.client.send({ cmd: 'update_shipping_status' }, {id,status}),
      );
  }
}
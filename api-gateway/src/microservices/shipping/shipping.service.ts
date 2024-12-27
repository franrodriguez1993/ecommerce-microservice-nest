import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ReqCreateShippingDto } from "./dto/reqCreateShipping.dto";
import { ShippingStatus } from "./enum/shipping-status.enum";
import { KafkaShippingMessageDto } from "./dto/kafkaShipping.dto";

@Injectable()
export class ShippingService {

  constructor(
    @Inject('SHIPPING_MICROSERVICE') private readonly client: ClientProxy,
    @Inject('SHIPPING_LOG_SERVICE') private readonly clientKafka: ClientKafka
  ) { }
  
    async createShipping(dto: ReqCreateShippingDto) {
      const shipping = await firstValueFrom(
        this.client.send({ cmd: 'create_shipping' }, dto),
      );

     if (shipping) {
          this.kafkaMessage({
            status: shipping.status,
            shippingId:shipping.id
          });
        }

      return shipping;
  }
  
  async getShippingById(id: number) {
    return await firstValueFrom(
        this.client.send({ cmd: 'get_by_id_shipping' }, id),
      );
  }

  async updateShippingStatus(id: number, status: ShippingStatus) {
        const shipping =  await firstValueFrom(
        this.client.send({ cmd: 'update_shipping_status' }, {id,status}),
    );
     if (shipping) {
          this.kafkaMessage({
            status: shipping.status,
            shippingId:shipping.id
          });
        }

    return shipping;
  }


  private async kafkaMessage(data: KafkaShippingMessageDto) {
 
     try {
        await firstValueFrom( this.clientKafka.emit('shipping_status', data))
    } catch (error) {
      console.warn('Kafka no disponible. Ignorando el evento.', error.message);
    }
    }
}
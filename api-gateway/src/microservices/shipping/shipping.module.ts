import { Module } from "@nestjs/common";
import { ShippingMicroserviceProvider } from "./shipping.provider";
import { ShippingController } from "./shipping.controller";
import { ShippingService } from "./shipping.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
          {
            name: 'SHIPPING_LOG_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'orders',
                brokers: [process.env.KAFKA_BROKER_2],
                retry: {
                  retries: 5,
                  initialRetryTime: 60000,
                  factor: 100, 
                  multiplier: 1,
        },
              },
              consumer: {
                groupId: 'orders-consumer',
              },
            },
          },
        ]),

  ], providers: [ShippingMicroserviceProvider, ShippingService], controllers: [ShippingController]
})
export class ShippingModule{

}
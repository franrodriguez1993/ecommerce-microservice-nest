import { Module } from '@nestjs/common';
import { OrdersMicroserviceProvider } from './orders.provider';
import { OrdersService } from './orders.service';
import { OrderController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_LOG_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: [process.env.KAFKA_BROKER_2],
          retry: {
              retries: 5,
              initialRetryTime: 30000,
              factor: 1.5, 
              multiplier: 1,
        },
          },
          consumer: {
            groupId: 'orders-consumer',
          },
          
        },
      },
    ]),
  ],
  providers: [OrdersMicroserviceProvider, OrdersService],
  controllers: [OrderController],
})
export class OrdersModule {}

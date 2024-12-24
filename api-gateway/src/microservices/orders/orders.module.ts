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
            brokers: ['localhost:9093'],
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

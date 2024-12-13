import { Module } from '@nestjs/common';
import { OrdersMicroserviceProvider } from './orders.provider';
import { OrdersService } from './orders.service';
import { OrderController } from './orders.controller';

@Module({
  providers: [OrdersMicroserviceProvider, OrdersService],
  controllers: [OrderController],
})
export class OrdersModule {}

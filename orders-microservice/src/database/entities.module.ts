import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { OrdersProduct } from './entities/orders-product.entity';

const ENTITIES = [
  TypeOrmModule.forFeature([Orders]),
  TypeOrmModule.forFeature([OrdersProduct]),
];

@Module({
  imports: ENTITIES,
  exports: ENTITIES,
})
export class EntitiesModule {}

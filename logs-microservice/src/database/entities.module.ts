import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUsers } from './entities/log-users.entity';
import { LogOrders } from './entities/log-order.entity';
import { LogShippings } from './entities/log-shipping.entity';


const ENTITIES = [
  TypeOrmModule.forFeature([LogUsers]), 
  TypeOrmModule.forFeature([LogOrders]),
  TypeOrmModule.forFeature([LogShippings])
];

@Module({
  imports: ENTITIES,
  exports: ENTITIES,
})
export class EntitiesModule {}

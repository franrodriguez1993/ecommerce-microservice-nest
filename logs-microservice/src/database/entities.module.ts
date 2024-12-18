import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUsers } from './entities/log-users.entity';
import { LogOrders } from './entities/log-order.entity';


const ENTITIES = [
  TypeOrmModule.forFeature([LogUsers]), 
  TypeOrmModule.forFeature([LogOrders])
];

@Module({
  imports: ENTITIES,
  exports: ENTITIES,
})
export class EntitiesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Addresses } from './entities/address.entity';

const ENTITIES = [
  TypeOrmModule.forFeature([Users]),
  TypeOrmModule.forFeature([Addresses]),
];

@Module({
  imports: ENTITIES,
  exports: ENTITIES,
})
export class EntitiesModule {}

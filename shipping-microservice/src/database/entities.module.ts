import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shippings } from './entities/shipping.entity';

const ENTITIES = [TypeOrmModule.forFeature([Shippings])];

@Module({
  imports: ENTITIES,
  exports: ENTITIES,
})
export class EntitiesModule {}

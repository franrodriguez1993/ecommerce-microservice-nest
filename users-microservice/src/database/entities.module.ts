import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

const ENTITIES = [TypeOrmModule.forFeature([Users])];

@Module({
  imports: ENTITIES,
  exports: ENTITIES,
})
export class EntitiesModule {}

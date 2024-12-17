import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUsers } from './entities/log-users.entity';


const ENTITIES = [
  TypeOrmModule.forFeature([LogUsers]),
];

@Module({
  imports: ENTITIES,
  exports: ENTITIES,
})
export class EntitiesModule {}

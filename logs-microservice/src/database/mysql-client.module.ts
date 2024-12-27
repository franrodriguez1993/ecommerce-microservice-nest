import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LogUsers } from './entities/log-users.entity';
import { LogOrders } from './entities/log-order.entity';
import { LogShippings } from './entities/log-shipping.entity';

const ENTITIES = [LogUsers,LogOrders,LogShippings];
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port:
        process.env.ENVIRONMENT == 'test'
          ? parseInt(process.env.MYSQL_PORT_TEST)
          : parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database:
        process.env.ENVIRONMENT == 'test'
          ? process.env.MYSQL_BBDD_TEST
          : process.env.MYSQL_BBDD,
      entities: ENTITIES,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  exports: [],
})
export class MySQLClientModule {}

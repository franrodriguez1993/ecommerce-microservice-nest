import { Module } from '@nestjs/common';
import { MySQLClientModule } from './database/mysql-client.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { EntitiesModule } from './database/entities.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EntitiesModule,
    MySQLClientModule,
    OrdersModule,
  ],
})
export class AppModule {}

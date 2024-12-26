import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShippingModule } from './modules/shipping/shipping.module';
import { EntitiesModule } from './database/entities.module';
import { MySQLClientModule } from './database/mysql-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ShippingModule,
    EntitiesModule,
    MySQLClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

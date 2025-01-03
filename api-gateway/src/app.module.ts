import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './microservices/products/products.module';
import { UsersModule } from './microservices/users/users.module';
import { OrdersModule } from './microservices/orders/orders.module';
import { SharedModule } from './shared/services/shared.module';
import { ShippingModule } from './microservices/shipping/shipping.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    UsersModule,
    OrdersModule,
    SharedModule,
    ShippingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

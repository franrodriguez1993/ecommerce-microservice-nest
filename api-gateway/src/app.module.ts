import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './microservices/products/products.module';
import { UsersModule } from './microservices/users/users.module';
import { OrdersModule } from './microservices/orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    UsersModule,
    OrdersModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

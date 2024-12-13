import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { MongoConfigModule } from './database/MongoConfig.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    MongoConfigModule,
  ],
})
export class AppModule {}

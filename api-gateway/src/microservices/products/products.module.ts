import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsMicroserviceProvider } from './products.provider';

@Module({
  providers: [ProductsService, ProductsMicroserviceProvider],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductModule {}

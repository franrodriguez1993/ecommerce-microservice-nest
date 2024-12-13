import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { EntitiesModule } from '../../database/entities.module';
import { UsersMicroserviceProvider } from '../../providers/users.provider';
import { ProductsMicroserviceProvider } from '../../providers/product.provider';
import { ProviderService } from './provider.service';

@Module({
  imports: [EntitiesModule],
  providers: [
    OrdersService,
    UsersMicroserviceProvider,
    ProductsMicroserviceProvider,
    ProviderService,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}

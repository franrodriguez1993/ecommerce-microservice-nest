import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { EntitiesModule } from '../../database/entities.module';
import { OrdersMicroserviceProvider } from '../../providers/order.provider';
import { UsersMicroserviceProvider } from '../../providers/users.provider';
import { ProviderService } from './provider.service';

@Module({
  imports: [EntitiesModule],
  controllers: [ShippingController],
  providers: [
    ShippingService,
    OrdersMicroserviceProvider,
    UsersMicroserviceProvider,
    ProviderService,
  ],
})
export class ShippingModule {}

import { Module } from "@nestjs/common";
import { ShippingMicroserviceProvider } from "./shipping.provider";
import { ShippingController } from "./shipping.controller";
import { ShippingService } from "./shipping.service";

@Module({
  imports: [], providers: [ShippingMicroserviceProvider, ShippingService], controllers: [ShippingController]
})
export class ShippingModule{

}
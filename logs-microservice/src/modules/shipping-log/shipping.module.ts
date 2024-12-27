import { Module } from "@nestjs/common";
import { ShippingService } from "./shipping.service";
import { ShippingController } from "./shipping.controller";
import { EntitiesModule } from "../../database/entities.module";


@Module({
  imports:[EntitiesModule],
  providers: [ShippingService],
  controllers:[ShippingController]
})
export class ShippingModule{

}
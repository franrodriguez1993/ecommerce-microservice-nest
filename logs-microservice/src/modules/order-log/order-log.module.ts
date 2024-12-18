import { Module } from "@nestjs/common";
import { OrderLogController } from "./order-log.controller";
import { OrderLogService } from "./order-log.service";
import { EntitiesModule } from "../../database/entities.module";

@Module({
  imports:[EntitiesModule],
  controllers: [OrderLogController],
  providers: [OrderLogService]
})
export class OrderLogModule{

}
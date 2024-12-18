import { Controller } from "@nestjs/common";
import { OrderLogService } from "./order-log.service";
import { EventPattern } from "@nestjs/microservices";
import { OrderKafka } from "./dto/OrderKafka.dto";

@Controller()
export class OrderLogController{
  constructor(private readonly orderLogsService: OrderLogService) { }
  
  @EventPattern('order_action')
  async orderAction(data:OrderKafka) {
    return this.orderLogsService.orderAction(data);
  }

}
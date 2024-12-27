import { Controller } from "@nestjs/common";
import { ShippingService } from "./shipping.service";
import { EventPattern } from "@nestjs/microservices";
import { KafkaShippingMessageDto } from "./shipping.dto";

@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) { }
  
  @EventPattern('shipping_status')
  async shippingStatus(data:KafkaShippingMessageDto) {
    return await this.shippingService.saveShippingLog(data);
  }
}
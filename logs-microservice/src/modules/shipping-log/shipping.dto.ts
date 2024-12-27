import { ShippingStatus } from "../../shared/enum/shipping-status.enum"

export class KafkaShippingMessageDto {
  shippingId: number;
  status: ShippingStatus;
}
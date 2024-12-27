import { ShippingStatus } from "../../utils/enum/shipping-status.enum"

export class KafkaShippingMessageDto {
  shippingId: number;
  status: ShippingStatus;
}
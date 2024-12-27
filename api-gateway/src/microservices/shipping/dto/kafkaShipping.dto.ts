import { ShippingStatus } from "../enum/shipping-status.enum";


export class KafkaShippingMessageDto {
  shippingId: number;
  status: ShippingStatus;
}
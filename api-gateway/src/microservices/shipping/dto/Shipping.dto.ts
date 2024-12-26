import { ShippingStatus } from "../enum/shipping-status.enum";


export class ShippingDto {
  id: number;

  name: string;

  lastname: string;

  address_street: string;

  address_number: number;

  city: string;

  floor: string;

  apartment: string;

  status: ShippingStatus;

  order_id: number;

  user_id: number;
}
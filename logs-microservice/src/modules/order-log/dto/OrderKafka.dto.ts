import { OrderAction } from "../enum/order-action.enum";

export class OrderKafka{
  action: OrderAction;
  orderId: number;
  userId: number;
}
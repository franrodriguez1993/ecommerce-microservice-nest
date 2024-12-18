import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LogOrders } from "../../database/entities/log-order.entity";
import { Repository } from "typeorm";
import { OrderKafka } from "./dto/OrderKafka.dto";


@Injectable()
export class OrderLogService{
  constructor(
    @InjectRepository(LogOrders)
    private readonly logOrderRepository: Repository<LogOrders>,
  ) { }
  
  async orderAction(data:OrderKafka) {
    const log = this.logOrderRepository.create({ action: data.action, userId: data.userId, orderId: data.orderId });
    return await this.logOrderRepository.save(log);
  }

}
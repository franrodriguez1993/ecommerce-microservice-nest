import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LogShippings } from "../../database/entities/log-shipping.entity";
import { Repository } from "typeorm";
import { KafkaShippingMessageDto } from "./shipping.dto";

@Injectable()
export class ShippingService {

    constructor(
      @InjectRepository(LogShippings)
      private readonly logShippingRepository: Repository<LogShippings>,
    ) {}
  
  async saveShippingLog(data: KafkaShippingMessageDto) {
    
    const log =  this.logShippingRepository.create({ status: data.status, shippingId: data.shippingId });

    return await this.logShippingRepository.save(log);
  }

}
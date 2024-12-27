import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ShippingDto } from '../../shared/dto/Shipping.dto';
import { ShippingService } from './shipping.service';
import { ReqCreateShippingDto } from '../../shared/dto/reqCreateShipping.dto';
import { ShippingStatus } from '../../shared/enum/shipping-status.enum';

@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @MessagePattern({ cmd: 'create_shipping' })
  async createShipping(dto:ReqCreateShippingDto): Promise<ShippingDto> {
  return await this.shippingService.createShipping(dto);
  }

  @MessagePattern({ cmd: 'get_by_id_shipping' })
  async getShippingById(id: number) {
    return await this.shippingService.getShippingByIdWithOrder(id);
  }

  @MessagePattern({ cmd: 'update_shipping_status' })
  async updateShippingStatus(data: { id: number, status: ShippingStatus }) {
    return await this.shippingService.updateShippingStatus(data.id, data.status);
  }
  }


import { BadRequestException, Injectable } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Shippings } from '../../database/entities/shipping.entity';
import { Repository } from 'typeorm';
import { ReqCreateShippingDto } from '../../shared/dto/reqCreateShipping.dto';
import { ShippingStatus } from '../../shared/enum/shipping-status.enum';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shippings)
    private readonly shippingRepository: Repository<Shippings>,
    private readonly providerService: ProviderService,
  ) {}

  async createShipping(data: ReqCreateShippingDto) {
    const user = await this.validateUser(data.user_id);
    const order = await this.validateOrder(data.order_id);
    const address = await this.validateAddress(data.address_id);

    const shipping = this.shippingRepository.create({
      name: user.name,
      lastname: user.lastname,
      address_street: address.street_name,
      address_number: address.street_number,
      city: address.city,
      floor: address.floor,
      apartment: address.apartment,
      status: ShippingStatus.PENDING,
      order_id: order.id,
      user_id: user.id,
    });

    return await this.shippingRepository.save(shipping);
  }
  
  async getShippingByIdWithOrder(id: number) {

    const shipping = await this.shippingRepository
      .createQueryBuilder('shipping')
      .where('shipping.id = :id', { id })
      .getOne()
    
    if (shipping) {
      const order = await this.validateOrder(shipping.order_id);
      return {...shipping,order} 
    }
    
    return shipping;
  }

    async getShippingById(id: number) {

    const shipping = await this.shippingRepository
      .createQueryBuilder('shipping')
      .where('shipping.id = :id', { id })
      .getOne()
    
    return shipping;
  }

  async updateShippingStatus(id: number, status: ShippingStatus) {
    
    const shipping = await this.getShippingById(id);

    if (shipping) {
      shipping.status = status;
    return  await this.shippingRepository.save(shipping);
    }
    return shipping;
  }

  /**  VALIDATE DATA  **/

 private async validateUser(user_id: number) {
    const user = await this.providerService.getUserById(user_id);

    if (!user) throw new BadRequestException('User not found');

    return user;
  }
 private async validateOrder(order_id: number) {
    const order = await this.providerService.getOrderById(order_id);

    if (!order) throw new BadRequestException('Order not found');

    return order;
  }

 private async validateAddress(address_id: number) {
    const address = await this.providerService.getAddressById(address_id);

    if (!address) throw new BadRequestException('Address not found');

    return address;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../../database/entities/orders.entity';
import { OrdersProduct } from '../../database/entities/orders-product.entity';
import { ProviderService } from './provider.service';
import { RequestCreateOrder } from '../../dto/RequestCreateOrder.dto';
import { OrderProductsDto } from '../../dto/OrderProducts.dto';
import { ResponseProductDto } from '../../dto/ResponseProduct.dto';
import { CartProduct } from '../../dto/CartProduct.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrdersProduct)
    private orderProductsRepository: Repository<OrdersProduct>,
    private readonly providerService: ProviderService,
  ) {}

  async createOrder(
    dto: RequestCreateOrder,
  ): Promise<{ order: Orders; orderProducts: CartProduct[] }> {
    /* check user */
    const user = await this.providerService.getUserById(dto.userId);
    if (!user) throw new NotFoundException('User not found');

    /* check products */
    const { total, availableProducts } = await this.checkProductsAndGetTotal(
      dto.products,
    );

    /* create order */
    const order = this.ordersRepository.create({ userId: dto.userId, total });
    await this.ordersRepository.save(order);

    /* create order products */
    const orderProducts = await this.createOrderProducts(
      order,
      availableProducts,
    );

    return { order, orderProducts };
  }

  async createOrderProducts(
    order: Orders,
    products: CartProduct[],
  ): Promise<CartProduct[]> {
    for await (const p of products) {
      const op = this.orderProductsRepository.create({
        quantity: p.quantity,
        productId: p.product._id,
        order,
      });
      await this.orderProductsRepository.save(op);
    }

    return products;
  }

  // check for available products and get total.
  // return: total for orders and the complete list of available products for the order ignoring unavailable products
  async checkProductsAndGetTotal(
    products: OrderProductsDto[],
  ): Promise<{ total: number; availableProducts: CartProduct[] }> {
    let total = 0;
    const availableProducts: CartProduct[] = [];

    for await (const p of products) {
      const product: ResponseProductDto =
        await this.providerService.getProductById(p.productId);
      if (product) {
        total += product.price * p.quantity;
        availableProducts.push({ quantity: p.quantity, product });
      }
    }
    return { total, availableProducts };
  }
}

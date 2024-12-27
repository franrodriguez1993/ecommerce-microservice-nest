import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../../database/entities/orders.entity';
import { OrdersProduct } from '../../database/entities/orders-product.entity';
import { ProviderService } from './provider.service';
import { ReqCreateOrderDto } from './dto/ReqCreateOrder.dto';
import { OrderProductsDto } from './dto/OrderProducts.dto';
import { ResProductDto } from './dto/ResProduct.dto';
import { CartProduct } from './dto/CartProduct.dto';
import { ResOrderDto } from './dto/ResOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrdersProduct)
    private orderProductsRepository: Repository<OrdersProduct>,
    private readonly providerService: ProviderService,
  ) {}

  async createOrder(dto: ReqCreateOrderDto): Promise<Orders> {
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
    order.products = orderProducts;
    return order;
  }

  async createOrderProducts(
    order: Orders,
    products: CartProduct[],
  ): Promise<OrdersProduct[]> {
    const orderProducts: OrdersProduct[] = [];
    for await (const p of products) {
      const op = this.orderProductsRepository.create({
        quantity: p.quantity,
        productId: p.product._id,
        name: p.product.name,
        price: p.product.price,
        order,
      });
      await this.orderProductsRepository.save(op);
      delete op.order;
      orderProducts.push(op);
    }

    return orderProducts;
  }

  async getOrderById(orderId: number): Promise<ResOrderDto> {
    return await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'orderProducts')
      .where('order.id = :orderId', { orderId })
      .getOne();
  }

  async getUserOrders(
    userId: number,
    offset: number = 0,
    limit: number = 10,
  ): Promise<{ total: number; orders: ResOrderDto[] }> {
    /* Count total orders */
    const total = await this.ordersRepository
      .createQueryBuilder('order')
      .where('order.userId = :userId', { userId })
      .getCount();

    const orders = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'orderProducts')
      .where('order.userId = :userId', { userId })
      .orderBy('order.created_at', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return { orders, total };
  }

  /* TOOLS */

  // check for available products and get total.
  // return: total for orders and the complete list of available products for the order ignoring unavailable products
  private async checkProductsAndGetTotal(
    products: OrderProductsDto[],
  ): Promise<{ total: number; availableProducts: CartProduct[] }> {
    let total = 0;
    const availableProducts: CartProduct[] = [];

    for await (const p of products) {
      const product: ResProductDto =
        await this.providerService.getProductById(p.productId);
      if (product) {
        total += product.price * p.quantity;
        availableProducts.push({ quantity: p.quantity, product });
      }
    }
    return { total, availableProducts };
  }
}

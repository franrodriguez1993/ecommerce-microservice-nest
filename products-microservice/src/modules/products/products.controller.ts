import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReqCreateProductDto } from './dto/ReqCreateProduct.dto';
import { ProductsService } from './products.service';
import { ResProductDto } from './dto/ResProduct.dto';
import { ReqUpdateProductDto } from './dto/ReqUpdateProduct.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(
    createProductDto: ReqCreateProductDto,
  ): Promise<ResProductDto> {
    const product = await this.productsService.create(createProductDto);
    return { ...product.toObject(), _id: product._id.toString() };
  }

  @MessagePattern({ cmd: 'find_by_id_product' })
  async findById(id: string): Promise<ResProductDto | null> {
    const product = await this.productsService.getById(id);

    if (product) {
      return { ...product.toObject(), _id: product._id.toString() };
    }
    return null;
  }


  @MessagePattern({ cmd: 'list_products' })
  async listProducts(offset:number,limit:number) {
    return await this.productsService.listProducts(offset, limit);
  }

  @MessagePattern({ cmd: 'update_by_id_product' })
  async updateByIdProduct(body: {
    id: string;
    data: ReqUpdateProductDto;
  }): Promise<ResProductDto | null> {
    const product = await this.productsService.updateProduct(
      body.id,
      body.data,
    );

    if (product) {
      return { ...product.toObject(), _id: product._id.toString() };
    }
    return null;
  }

  @MessagePattern({ cmd: 'delete_by_id_product' })
  async deleteById(id: string) {
    const result = await this.productsService.deleteById(id);

    if (result.deletedCount === 1) {
      return 'Product deleted';
    }
    return 'Product not deleted';
  }
}

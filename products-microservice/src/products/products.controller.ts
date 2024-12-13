import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RequestCreateProduct } from './dto/RequestCreateProduct.dto';
import { ProductsService } from './products.service';
import { ResponseProductDto } from './dto/ResponseProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(
    createProductDto: RequestCreateProduct,
  ): Promise<ResponseProductDto> {
    const product = await this.productsService.create(createProductDto);
    return { ...product.toObject(), _id: product._id.toString() };
  }

  @MessagePattern({ cmd: 'find_by_id_product' })
  async findById(id: string): Promise<ResponseProductDto | null> {
    const product = await this.productsService.getById(id);

    if (product) {
      return { ...product.toObject(), _id: product._id.toString() };
    }
    return null;
  }

  @MessagePattern({ cmd: 'update_by_id_product' })
  async updateByIdProduct(body: {
    id: string;
    data: UpdateProductDto;
  }): Promise<ResponseProductDto | null> {
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

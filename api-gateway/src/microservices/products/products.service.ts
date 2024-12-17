import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Envía los datos al microservicio de productos
    return firstValueFrom(
      this.client.send({ cmd: 'create_product' }, createProductDto),
    );
  }

  async getById(id: string) {
    return firstValueFrom(this.client.send({ cmd: 'find_by_id_product' }, id));
  }

  async listProducts(offset: number, limit: number) {
    return firstValueFrom(
      this.client.send({ cmd: 'list_products' }, { offset, limit }),
    );
  }

  async updateById(id: string, data: UpdateProductDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'update_by_id_product' }, { id, data }),
    );
  }

  async deleteById(id: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'delete_by_id_product' }, { id }),
    );
  }
}

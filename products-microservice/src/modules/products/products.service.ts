import { Injectable } from '@nestjs/common';
import { RequestCreateProduct } from './dto/RequestCreateProduct.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { Model, Types } from 'mongoose';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: RequestCreateProduct) {
    return await this.productModel.create(createProductDto);
  }

  async getById(id: string) {
    return await this.productModel.findOne({ _id: id });
  }

  async listProducts(offset: number = 0, limit: number = 50) {
    
    const [products, total] = await Promise.all([
    this.productModel.find({})
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 }),
    this.productModel.countDocuments({})
    ]);
    
    return { products, total };
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string) {
    return await this.productModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
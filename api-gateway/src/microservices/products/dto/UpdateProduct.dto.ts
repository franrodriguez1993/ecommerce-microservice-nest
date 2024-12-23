import { PartialType } from '@nestjs/swagger';
import { ReqCreateProductDto } from './ReqCreateProduct.dto';

export class UpdateProductDto extends PartialType(ReqCreateProductDto) {}

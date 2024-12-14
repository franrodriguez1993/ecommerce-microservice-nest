import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { ResponseProductDto } from './dto/ResponseProduct.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ description: 'Create New Product' })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<{
    statusCode: HttpStatus;
    result: { product: ResponseProductDto };
  }> {
    const product = await this.productsService.create(createProductDto);
    return { statusCode: HttpStatus.OK, result: { product } };
  }


  @Get()
  @ApiOperation({ description: 'List products' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items to return',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset for pagination',
  })
  
  async listProducts(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,):
    Promise<{
    statusCode: HttpStatus;
    result: { total:number,products:ResponseProductDto[] };
  }> {
    const result = await this.productsService.listProducts(offset,limit);

    return { statusCode: HttpStatus.OK, result };
  }



  @Get(':id')
  @ApiOperation({ description: 'Get product by id' })
  async getById(@Param('id') id: string): Promise<{
    statusCode: HttpStatus;
    result: { product: ResponseProductDto };
  }> {
    const product = await this.productsService.getById(id);

    return { statusCode: HttpStatus.OK, result: { product } };
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update product by id' })
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<{
    statusCode: HttpStatus;
    result: { product: ResponseProductDto };
  }> {
    const product = await this.productsService.updateById(id, body);

    return { statusCode: HttpStatus.OK, result: { product } };
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete product by id' })
  async deleteById(@Param('id') id: string): Promise<{
    statusCode: HttpStatus;
    result: { message: string };
  }> {
    const message = await this.productsService.deleteById(id);

    return { statusCode: HttpStatus.OK, result: { message } };
  }
}

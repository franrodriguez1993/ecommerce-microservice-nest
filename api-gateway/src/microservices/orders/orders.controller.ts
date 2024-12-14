import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { RequestCreateOrder } from './dto/RequestCreateOrder.dto';
import { ResponseOrderDto } from './dto/ResponseOrder.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @ApiOperation({ description: 'Create a new order' })
  async createOrder(
    @Body() dto: RequestCreateOrder,
  ): Promise<{ statusCode: HttpStatus; result: ResponseOrderDto }> {
    const order = await this.orderService.createOrder(dto);

    return { statusCode: HttpStatus.CREATED, result: order };
  }

  @Get(':id')
  @ApiOperation({ description: 'Get order by id' })
  async getOrderById(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; result: ResponseOrderDto }> {
    const order = await this.orderService.getById(id);

    return { statusCode: HttpStatus.OK, result: order };
  }

  @Get('list/:userId')
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
  async getUserOrders(
    @Param('userId') userId: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<{
    statusCode: HttpStatus;
    result: { total: number; orders: ResponseOrderDto[] };
  }> {
    const result = await this.orderService.getUserOrders(userId, offset, limit);

    return { statusCode: HttpStatus.OK, result };
  }
}

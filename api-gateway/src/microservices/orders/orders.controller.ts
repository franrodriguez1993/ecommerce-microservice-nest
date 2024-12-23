import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { ResOrderDto } from './dto/ResOrder.dto';
import { AuthenticationGuard } from '../../shared/guard/authorization.guard';
import { RequestExt } from '../../shared/interface/request-ext.interface';
import { ReqCreateOrderFrontDto } from './dto/ReqCreateOrderFront.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create a new order' })
  async createOrder(
    @Body() dto: ReqCreateOrderFrontDto,
    @Req()req:RequestExt
  ): Promise<{ statusCode: HttpStatus; result: ResOrderDto }> {

    const order = await this.orderService.createOrder({...dto,userId:parseInt(req.userId)});

    return { statusCode: HttpStatus.CREATED, result: order };
  }

   @Get('list')
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
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
    @Req() req:RequestExt,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,

  ): Promise<{
    statusCode: HttpStatus;
    result: { total: number; orders: ResOrderDto[] };
  }> {
    const userId = parseInt(req.userId);
    const result = await this.orderService.getUserOrders(userId, offset, limit);

    return { statusCode: HttpStatus.OK, result };
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get order by id' })
  async getOrderById(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; result: ResOrderDto }> {
    const order = await this.orderService.getById(id);

    return { statusCode: HttpStatus.OK, result: order };
  }

 
}

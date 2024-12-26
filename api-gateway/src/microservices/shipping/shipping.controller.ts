import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ShippingService } from "./shipping.service";
import { AuthenticationGuard } from "../../shared/guard/authorization.guard";
import { RequestExt } from "../../shared/interface/request-ext.interface";
import { ReqCreateShippingDto } from "./dto/reqCreateShipping.dto";
import { ShippingDto } from "./dto/Shipping.dto";
import { UpdateStatusShippingDto } from "./dto/ReqUpdateStatusShipping.dto";

@Controller('shipping')
@ApiTags('shipping')
export class ShippingController{

  constructor(private readonly shippingService: ShippingService) { }
  

  @Post()
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create a new order' })
  async createShipping(@Req() req: RequestExt, @Body() body: ReqCreateShippingDto):Promise<{statusCode:HttpStatus,result:{shipping:ShippingDto}}> {
    const userId = req.userId
    const shipping = await this.shippingService.createShipping({ ...body, user_id: parseInt(userId) });
    
    return {
      statusCode: HttpStatus.CREATED,
      result:{shipping}
    }
  }

  @Get(":id")
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  async getShippingById(@Param('id') id: number) {
    
    const shipping = await this.shippingService.getShippingById(id);
    
    return {
      statusCode: HttpStatus.CREATED,
      result:{shipping}
    }
  }

  @Patch(":id")
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  async updateShippingStatus(@Param('id') id: number,@Body() dto:UpdateStatusShippingDto) {
    
    const shipping = await this.shippingService.updateShippingStatus(id,dto.status);
    
    return {
      statusCode: HttpStatus.OK,
      result:{shipping}
    }
  }
}
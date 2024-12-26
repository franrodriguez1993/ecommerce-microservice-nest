import { IsEnum } from "class-validator";
import { ShippingStatus } from "../enum/shipping-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStatusShippingDto{

  @IsEnum(ShippingStatus)
  @ApiProperty({
    enum: ShippingStatus
  })
  status: ShippingStatus;
}
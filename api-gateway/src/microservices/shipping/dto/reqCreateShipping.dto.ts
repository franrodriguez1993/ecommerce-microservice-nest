import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ReqCreateShippingDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  address_id: number;
  
  @IsOptional()
  user_id?: number;
  
}
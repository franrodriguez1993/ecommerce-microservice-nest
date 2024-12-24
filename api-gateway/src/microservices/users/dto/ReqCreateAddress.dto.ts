import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReqCreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street_name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  street_number: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  floor: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  apartment: string;

  @IsNumber()
  @IsOptional() // user_id is optional because it will be set by the service
  user_id: number;
}

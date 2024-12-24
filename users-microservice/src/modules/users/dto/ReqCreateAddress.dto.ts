import { IsNumber, IsString } from 'class-validator';

export class ReqCreateAddressDto {
  @IsString()
  city: string;

  @IsString()
  street_name: string;

  @IsNumber()
  street_number: number;

  @IsString()
  floor: string;

  @IsString()
  apartment: string;

  @IsNumber()
  user_id: number;
}

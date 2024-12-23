import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReqUpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  category: string;
}

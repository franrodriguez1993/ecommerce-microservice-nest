import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResProductDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  createdAt?: Date;

  @IsString()
  @IsOptional()
  updatedAt?: string;
}

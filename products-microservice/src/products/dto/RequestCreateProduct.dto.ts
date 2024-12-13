import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class RequestCreateProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}

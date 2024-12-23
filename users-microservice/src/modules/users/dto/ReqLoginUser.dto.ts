import { IsNotEmpty, IsString } from 'class-validator';

export class ReqLoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

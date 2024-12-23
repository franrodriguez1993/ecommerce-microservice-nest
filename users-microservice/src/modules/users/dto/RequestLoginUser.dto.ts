import { IsNotEmpty, IsString } from 'class-validator';

export class RequestLoginUser {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

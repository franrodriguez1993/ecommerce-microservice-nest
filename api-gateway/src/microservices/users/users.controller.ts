import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RequestCreateUser } from './dto/RequestCreateUser.dto';
import { UserDto } from './dto/User.dto';
import { RequestLoginUser } from './dto/RequestLoginUser.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ description: 'Register new user in the system' })
  async register(
    @Body() body: RequestCreateUser,
  ): Promise<{ statusCode: HttpStatus; result: { user: UserDto } }> {
    const user = await this.usersService.register(body);

    return { statusCode: HttpStatus.CREATED, result: { user } };
  }

  @Post('login')
  @ApiOperation({ description: 'Login user and get access and refresh token' })
  async login(
    @Body() body: RequestLoginUser,
  ): Promise<{ statusCode: HttpStatus; result: { user: UserDto, acessToken:string, refreshToken:string } }> {
    const result = await this.usersService.login(body);

    return { statusCode: HttpStatus.OK, result };
  }

  @Get('')
  @ApiOperation({ description: 'List all users' })
  async listUsers(): Promise<{
    statusCode: HttpStatus;
    result: { users: UserDto[] };
  }> {
    const users = await this.usersService.listAll();

    return { statusCode: HttpStatus.OK, result: { users } };
  }

  @Get(':id')
  @ApiOperation({ description: 'Get user by id' })
  async getById(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; result: { user: UserDto } }> {
    const user = await this.usersService.getById(id);

    return { statusCode: HttpStatus.OK, result: { user } };
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete user by id' })
  async deleteById(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; result: { message: string } }> {
    const message = await this.usersService.deleteById(id);
    return { statusCode: HttpStatus.OK, result: { message } };
  }

}

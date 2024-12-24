import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ReqCreateUserDto } from './dto/ReqCreateUser.dto';
import { UserDto } from './dto/User.dto';
import { ReqLoginUserDto } from './dto/ReqLoginUser.dto';
import { AuthenticationGuard } from '../../shared/guard/authorization.guard';
import { AddressDto } from './dto/Address.dto';
import { ReqCreateAddressDto } from './dto/ReqCreateAddress.dto';
import { RequestExt } from '../../shared/interface/request-ext.interface';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ description: 'Register new user in the system' })
  async register(
    @Body() body: ReqCreateUserDto,
  ): Promise<{ statusCode: HttpStatus; result: { user: UserDto } }> {
    const user = await this.usersService.register(body);

    return { statusCode: HttpStatus.CREATED, result: { user } };
  }

  @Post('login')
  @ApiOperation({ description: 'Login user and get access and refresh token' })
  async login(@Body() body: ReqLoginUserDto): Promise<{
    statusCode: HttpStatus;
    result: { user: UserDto; accessToken: string; refreshToken: string };
  }> {
    const result = await this.usersService.login(body);

    return { statusCode: HttpStatus.OK, result };
  }

  @Get('')
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  async getById(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; result: { user: UserDto } }> {
    const user = await this.usersService.getById(id);

    return { statusCode: HttpStatus.OK, result: { user } };
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete user by id' })
  async deleteById(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; result: { message: string } }> {
    const message = await this.usersService.deleteById(id);
    return { statusCode: HttpStatus.OK, result: { message } };
  }

  /* ADDRESS */

  @Post('address')
  @ApiOperation({ description: 'Create a new user address' })
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  async createAddress(
    @Body() body: ReqCreateAddressDto,
    @Req() req: RequestExt,
  ): Promise<{ statusCode: HttpStatus; result: { address: AddressDto } }> {
    const user_id = req.userId;

    const address = await this.usersService.createAddress({
      ...body,
      user_id: parseInt(user_id),
    });

    return { statusCode: HttpStatus.CREATED, result: { address } };
  }

  @Get('address/list')
  @ApiOperation({ description: 'List addresses by user' })
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  async listAddresses(
    @Req() req: RequestExt,
  ): Promise<{ statusCode: HttpStatus; result: { addresses: AddressDto[] } }> {
    const user_id = req.userId;

    const addresses = await this.usersService.listAddresses(parseInt(user_id));

    return { statusCode: HttpStatus.OK, result: { addresses } };
  }

  @Delete('address/:id')
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete address by id' })
  async deleteAddressById(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; result: { message: string } }> {
    const message = await this.usersService.deleteAddressById(id);
    return { statusCode: HttpStatus.OK, result: { message } };
  }
}

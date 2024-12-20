import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './users.service';
import { UserDto } from './dto/User.dto';
import { RequestCreateUser } from './dto/RequestCreateUser.dto';

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'list_users' })
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @MessagePattern({ cmd: 'register_user' })
  async registerUser(data: RequestCreateUser): Promise<UserDto> {
    return await this.userService.create(data);
  }

  @MessagePattern({ cmd: 'get_by_id_user' })
  async getById(id: number): Promise<UserDto | null> {
    const user = await this.userService.findById(id);
    if (user) {
      delete user.password;
      return user;
    }
    return null;
  }

  @MessagePattern({ cmd: 'delete_by_id_user' })
  async deleteById(id: number): Promise<string> {
    const result = await this.userService.remove(id);
    if (result) {
      return 'User deleted';
    }
    return 'User not deleted';
  }
}

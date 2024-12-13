import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestCreateUser } from './dto/RequestCreateUser.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async register(createUserDto: RequestCreateUser) {
    // Envía los datos al microservicio de productos
    return firstValueFrom(
      this.client.send({ cmd: 'register_user' }, createUserDto),
    );
  }

  async listAll() {
    return firstValueFrom(this.client.send({ cmd: 'list_users' }, {}));
  }

  async getById(id: number) {
    return firstValueFrom(this.client.send({ cmd: 'get_by_id_user' }, id));
  }

  async deleteById(id: number) {
    return firstValueFrom(this.client.send({ cmd: 'delete_by_id_user' }, id));
  }
}

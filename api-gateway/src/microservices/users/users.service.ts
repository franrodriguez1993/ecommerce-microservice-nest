import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { RequestCreateUser } from './dto/RequestCreateUser.dto';
import { firstValueFrom } from 'rxjs';
import { KafkaUserMessage } from './dto/kafka-user.dto';
import { UserActions } from './enum/user-actions.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly client: ClientProxy,
    @Inject('USER_LOG_SERVICE') private readonly clientKafka: ClientKafka,
  ) { }
  
  async register(createUserDto: RequestCreateUser) {
    // register user
    const user = await firstValueFrom(
      this.client.send({ cmd: 'register_user' }, createUserDto),
    );
    
    // kafka action logs
    if (user) {
      this.kafkaMessage({ action: UserActions.REGISTERED, userId: user.id });
    }

    return user;
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

  private kafkaMessage(data:KafkaUserMessage){
    this.clientKafka.emit("user_action", data);
  }
}

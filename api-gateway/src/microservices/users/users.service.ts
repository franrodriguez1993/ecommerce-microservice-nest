import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { RequestCreateUser } from './dto/RequestCreateUser.dto';
import { firstValueFrom } from 'rxjs';
import { KafkaUserMessage } from './dto/kafka-user.dto';
import { UserActions } from './enum/user-actions.enum';
import { RequestLoginUser } from './dto/RequestLoginUser.dto';
import JWTService from '../../shared/services/jwt.service';
import { ModuleRef } from '@nestjs/core';
import { HashService } from '../../shared/services/hash.service';

@Injectable()
export class UsersService {
  private jwtService: JWTService;
  private hashService: HashService;

  constructor(
    @Inject('USERS_MICROSERVICE') private readonly client: ClientProxy,
    @Inject('USER_LOG_SERVICE') private readonly clientKafka: ClientKafka,
    private readonly moduleRef:ModuleRef
  ) { }

  onModuleInit() {
    this.jwtService = this.moduleRef.get(JWTService, { strict: false });
    this.hashService = this.moduleRef.get(HashService, { strict: false });
  }
  
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

  async login(createUserDto: RequestLoginUser) {
    // login user
    const user = await firstValueFrom(
      this.client.send({ cmd: 'login_user' }, createUserDto),
    );

    if (!user) return null;

    // hash role for jwt:
    const hashedRole = await this.hashService.encrypt(user.role);

    // generate access & refresh token
    const accessToken = this.jwtService.createJWT(user.id,hashedRole);
    const refreshToken = this.jwtService.createRefreshJWT(user.id);
    
    // kafka action logs
    // if (user) {
    //   this.kafkaMessage({ action: UserActions.REGISTERED, userId: user.id });
    // }

    return { user, accessToken, refreshToken };
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

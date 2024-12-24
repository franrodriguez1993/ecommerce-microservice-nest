import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { ReqCreateUserDto } from './dto/ReqCreateUser.dto';
import { firstValueFrom } from 'rxjs';
import { KafkaUserMessage } from './dto/kafka-user.dto';
import { UserActions } from './enum/user-actions.enum';
import { ReqLoginUserDto } from './dto/ReqLoginUser.dto';
import JWTService from '../../shared/services/jwt.service';
import { ModuleRef } from '@nestjs/core';
import { ReqCreateAddressDto } from './dto/ReqCreateAddress.dto';

@Injectable()
export class UsersService {
  private jwtService: JWTService;

  constructor(
    @Inject('USERS_MICROSERVICE') private readonly client: ClientProxy,
    @Inject('USER_LOG_SERVICE') private readonly clientKafka: ClientKafka,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.jwtService = this.moduleRef.get(JWTService, { strict: false });
  }

  async register(createUserDto: ReqCreateUserDto) {
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

  async login(createUserDto: ReqLoginUserDto) {
    // login user
    const user = await firstValueFrom(
      this.client.send({ cmd: 'login_user' }, createUserDto),
    );

    if (!user) return null;

    // generate access & refresh token
    const accessToken = this.jwtService.createJWT(user.id, user.role);
    const refreshToken = this.jwtService.createRefreshJWT(user.id);

    // kafka action logs
    if (user) {
      this.kafkaMessage({ action: UserActions.REGISTERED, userId: user.id });
    }

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

  /*  Addresses */

  async createAddress(data: ReqCreateAddressDto) {
    return firstValueFrom(this.client.send({ cmd: 'create_address' }, data));
  }

  async listAddresses(userId: number) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_addresses_by_user_id' }, userId),
    );
  }

  async deleteAddressById(id: number) {
    return firstValueFrom(
      this.client.send({ cmd: 'delete_address_by_id' }, id),
    );
  }

  private kafkaMessage(data: KafkaUserMessage) {
    this.clientKafka.emit('user_action', data);
  }
}

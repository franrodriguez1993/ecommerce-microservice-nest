import { Injectable } from '@nestjs/common';
import { HashService } from '../../utils/hash.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { RequestCreateUser } from './dto/RequestCreateUser.dto';
import { ModuleRef } from '@nestjs/core';
import { RequestLoginUser } from './dto/RequestLoginUser.dto';


@Injectable()
export class UserService {
  private hashService: HashService;
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.hashService = this.moduleRef.get(HashService, { strict: false });
  }
  async register(createUserDto: RequestCreateUser) {
    const newPassword = await this.hashService.encrypt(createUserDto.password);
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: newPassword,
    });

    return await this.userRepository.save(user);
  }

  async login(requestLoginUser:RequestLoginUser) {
    const user = await this.userRepository.findOne({ where: { username: requestLoginUser.username } });
    if (!user) return null;

    const isValidPassword = await this.hashService.compare(requestLoginUser.password, user.password);
    if (!isValidPassword) return null;

    delete user.password;
    return user;
  }

  findAll() {
    return this.userRepository.find({
      where: {},
      select: ['email', 'id', 'username'],
    });
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByUsername(username: string) { 
    return this.userRepository.findOne({ where: { username } });
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) return;
    return this.userRepository.remove(user);
  }
}

import { Injectable } from '@nestjs/common';
import { HashService } from '../../utils/hash.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { RequestCreateUser } from './dto/RequestCreateUser.dto';
import { ModuleRef } from '@nestjs/core';

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
  async create(createUserDto: RequestCreateUser) {
    const newPassword = await this.hashService.encrypt(createUserDto.password);
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: newPassword,
    });

    return await this.userRepository.save(user);
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

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) return;
    return this.userRepository.remove(user);
  }
}

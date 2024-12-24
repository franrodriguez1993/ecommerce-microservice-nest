import { Injectable } from '@nestjs/common';
import { HashService } from '../../utils/hash.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { ReqCreateUserDto } from './dto/ReqCreateUser.dto';
import { ModuleRef } from '@nestjs/core';
import { ReqLoginUserDto } from './dto/ReqLoginUser.dto';
import { ReqCreateAddressDto } from './dto/ReqCreateAddress.dto';
import { Addresses } from '../../database/entities/address.entity';

@Injectable()
export class UserService {
  private hashService: HashService;
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Addresses)
    private addressRepository: Repository<Addresses>,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.hashService = this.moduleRef.get(HashService, { strict: false });
  }
  async register(createUserDto: ReqCreateUserDto) {
    const newPassword = await this.hashService.encrypt(createUserDto.password);
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: newPassword,
    });

    return await this.userRepository.save(user);
  }

  async login(requestLoginUser: ReqLoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: requestLoginUser.username },
    });
    if (!user) return null;

    const isValidPassword = await this.hashService.compare(
      requestLoginUser.password,
      user.password,
    );
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


  /*  ADDRESS */

  async createAddress(dto:ReqCreateAddressDto){
    const user = await this.userRepository.findOne({where:{id:dto.user_id}});
    if (!user) return null;
    
    const address = this.addressRepository.create({
      city: dto.city,
      street_name: dto.street_name,
      street_number: dto.street_number,
      floor: dto.floor,
      apartment: dto.apartment,
      user
    });
 ;
    const newAddress = await this.addressRepository.save(address);
    delete newAddress.user;
    return newAddress;
  }

  async getAddressesByUserId(id: number){
    return this.addressRepository.createQueryBuilder('address')
      .leftJoin('address.user', 'user')
      .where('user.id = :id', { id })
      .select(['address.id',
        'address.city',
        'address.street_name',
        'address.street_number',
        'address.floor',
        'address.apartment'])
      .getMany();
  }

  async deleteAddressById(id: number){
    const address = await this.addressRepository.findOne({where:{id}});
    if (!address) return null;
    return this.addressRepository.remove(address);
  }
}

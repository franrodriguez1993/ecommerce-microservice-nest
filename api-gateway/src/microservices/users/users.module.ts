import { Module } from '@nestjs/common';
import { UsersMicroserviceProvider } from './users.provider';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersMicroserviceProvider, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

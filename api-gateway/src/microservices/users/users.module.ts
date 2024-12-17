import { Module } from '@nestjs/common';
import { UsersMicroserviceProvider } from './users.provider';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
     ClientsModule.register([
      {
        name: 'USER_LOG_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'users-consumer',
          },
        },
      },
    ]),
  ],
  providers: [UsersMicroserviceProvider, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

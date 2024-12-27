import { Module } from '@nestjs/common';
import { UsersMicroserviceProvider } from './users.provider';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '../../shared/services/shared.module';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'USER_LOG_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: [process.env.KAFKA_BROKER_1],
          retry: {
              retries: 5,
              initialRetryTime: 30000,
              factor: 1.5, 
              multiplier: 1,
        },
          },
          consumer: {
            groupId: 'users-consumer',
          },
          producer: { idempotent: true },
        },
      },
    ]),
  ],
  providers: [UsersMicroserviceProvider, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

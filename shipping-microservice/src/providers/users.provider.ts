import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const UsersMicroserviceProvider = {
  provide: 'USERS_MICROSERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.USER_MS_PORT),
      },
    });
  },
};

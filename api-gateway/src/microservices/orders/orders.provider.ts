import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const OrdersMicroserviceProvider = {
  provide: 'ORDERS_MICROSERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.PORT,
        port: parseInt(process.env.ORDERS_MS_PORT),
      },
    });
  },
};

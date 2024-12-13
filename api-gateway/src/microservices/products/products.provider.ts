import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const ProductsMicroserviceProvider = {
  provide: 'PRODUCTS_MICROSERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002, // Puerto del microservicio de productos
      },
    });
  },
};

import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const ProductsMicroserviceProvider = {
  provide: 'PRODUCTS_MICROSERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PRODUCT_MS_PORT), 
      },
    });
  },
};

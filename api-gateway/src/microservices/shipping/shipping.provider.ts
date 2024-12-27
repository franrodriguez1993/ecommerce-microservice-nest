import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const ShippingMicroserviceProvider = {
  provide: 'SHIPPING_MICROSERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.SHIPPING_MS_PORT),
      },
    });
  },
};

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER_1],
        },
        consumer: {
          groupId: 'users-consumer',
        },
      },
    },
  );

    const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER_2],
        },
        consumer: {
          groupId: 'orders-consumer',
        },
      },
    },
  );

   await Promise.all([app1.listen(), app2.listen()]);
}
bootstrap();

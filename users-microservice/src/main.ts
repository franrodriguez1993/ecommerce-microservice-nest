import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: parseInt(process.env.PORT) },
    },
  );

  await app.listen();
  console.log('Microservicio Usuarios corriendo en el puerto '+ process.env.PORT );
}
bootstrap();

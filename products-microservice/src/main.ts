import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3002 },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Reject request with data that is not in the DTO
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.ENVIRONMENT == 'production' ? true : false,
      transformOptions: {
        enableImplicitConversion: true, // Convertir Query params en numbers
      },
    }),
  );

  await app.listen();
  console.log('Microservicio Productos corriendo en el puerto 3002');
}
bootstrap();

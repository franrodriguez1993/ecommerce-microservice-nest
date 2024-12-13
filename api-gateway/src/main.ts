import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Configuración del microservicio Usuarios
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 3001 },
  });

  // Configuración del microservicio Productos
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 3002 },
  });

  const config = new DocumentBuilder()
    .setTitle('Nest Microservices')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // await app.startAllMicroservices(); // Inicia los microservicios conectados
  await app.listen(process.env.PORT); // API Gateway escucha en el puerto 3000
  console.log('API Gateway corriendo en http://localhost:3000');
}
bootstrap();

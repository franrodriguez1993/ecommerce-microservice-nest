import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.ENVIRONMENT == 'production' ? true : false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración del microservicio Usuarios
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: process.env.HOST, port: parseInt(process.env.USER_MS_PORT)},
  });

  // Configuración del microservicio Productos
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: process.env.HOST, port: parseInt(process.env.PRODUCT_MS_PORT) },
  });

  const config = new DocumentBuilder()
    .setTitle('Nest Microservices')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT); 
  console.log('API Gateway corriendo en http://localhost:3000');
}
bootstrap();

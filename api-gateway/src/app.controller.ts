import { Controller, Get } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private userService: ClientProxy;
  private productService: ClientProxy;

  constructor() {
    // Configuración para conectar a los microservicios
    this.userService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3001 },
    });

    this.productService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3002 },
    });
  }

  @Get('users')
  async getUsers() {
    return this.userService.send({ cmd: 'list_users' }, {}); // Enviar mensaje a Usuarios
  }

  @Get('products')
  async getProducts() {
    return this.productService.send({ cmd: 'get_products' }, {}); // Enviar mensaje a Productos
  }
}

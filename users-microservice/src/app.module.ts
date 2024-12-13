import { Module } from '@nestjs/common';
import { MySQLClientModule } from './database/mysql-client.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './utils/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MySQLClientModule,
    UsersModule,
    UtilsModule,
  ],
})
export class AppModule {}

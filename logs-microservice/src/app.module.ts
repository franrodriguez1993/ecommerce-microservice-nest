import { Module } from '@nestjs/common';
import { UserLogModule } from './modules/user-log/user-log.module';
import { ConfigModule } from '@nestjs/config';
import { MySQLClientModule } from './database/mysql-client.module';
import { EntitiesModule } from './database/entities.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    UserLogModule,
  MySQLClientModule,
    EntitiesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

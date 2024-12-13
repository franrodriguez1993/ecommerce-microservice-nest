import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { EntitiesModule } from '../../database/entities.module';
import { UtilsModule } from '../../utils/util.module';
import { UserService } from './users.service';

@Module({
  imports: [EntitiesModule, UtilsModule],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}

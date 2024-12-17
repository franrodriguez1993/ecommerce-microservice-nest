import { Module } from "@nestjs/common";
import { UserLogService } from "./user-log.service";
import { EntitiesModule } from "../../database/entities.module";
import { UserLogController } from "./user-log.controller";

@Module({
  imports:[EntitiesModule],
  providers: [UserLogService],
  controllers:[UserLogController]
})
export class UserLogModule{

}
import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { UserLogService } from "./user-log.service";

@Controller()
export class UserLogController{
  constructor(private readonly userLogService:UserLogService){}
  @EventPattern('user_action')
    async handleUserAction( data: any) {
    return await this.userLogService.saveUserLog(data);
    }



}
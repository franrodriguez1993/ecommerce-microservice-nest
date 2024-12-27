import { UserActions } from "../../shared/enum/user-actions.enum";

export class KafkaUserMessageDto {
  action: UserActions;
  userId: number;
}
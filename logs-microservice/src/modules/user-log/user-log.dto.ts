import { UserActions } from "../../utils/enum/user-actions.enum";

export class KafkaUserMessageDto {
  action: UserActions;
  userId: number;
}
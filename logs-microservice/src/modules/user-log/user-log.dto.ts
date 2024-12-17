import { UserActions } from "../../utils/enum/user-actions.enum";

export class KafkaUserMessage {
  action: UserActions;
  userId: number;
}
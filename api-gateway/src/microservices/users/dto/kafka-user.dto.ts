import { UserActions } from "../enum/user-actions.enum";

export class KafkaUserMessage {
  action: UserActions;
  userId: number;
}
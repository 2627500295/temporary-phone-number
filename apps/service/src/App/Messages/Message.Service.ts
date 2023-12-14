import { PushMessageInput } from '../../Domain/DTOs/Message/PushMessage.Input';
import { MessageEntity } from '../../Domain/Entities/Message.Entity';

export abstract class MessageService {
  abstract createMessage(input: PushMessageInput): Promise<MessageEntity>;
  abstract listMessages(phoneNumber: string): Promise<[MessageEntity[], number]>;
  // abstract getMessage(): Promise<unknown>;
  // abstract updateMessage(): Promise<unknown>;
  // abstract deleteMessage(): Promise<boolean>;
}

import { PushMessageInput } from '@domain/DTOs/Message/PushMessage.Input';
import { MessageEntity } from '@domain/Entities/Message.Entity';

export abstract class MessageService {
  abstract createMessage(input: PushMessageInput): Promise<MessageEntity>;
  // abstract listMessages(): Promise<unknown[]>;
  // abstract getMessage(): Promise<unknown>;
  // abstract updateMessage(): Promise<unknown>;
  // abstract deleteMessage(): Promise<boolean>;
}

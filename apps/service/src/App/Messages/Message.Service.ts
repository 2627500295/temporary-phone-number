import { CreateMessageInput } from '@domain/DTOs/CreateMessage.Input';
import { ReceiveEntity } from '@domain/Entities/Receive.Entity';

export abstract class MessageService {
  abstract createMessage(
    input: CreateMessageInput,
    phone: ReceiveEntity,
  ): Promise<unknown>;
  abstract listMessages(): Promise<unknown[]>;
  abstract getMessage(): Promise<unknown>;
  abstract updateMessage(): Promise<unknown>;
  abstract deleteMessage(): Promise<boolean>;
}

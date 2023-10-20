import { CreateMessageInput } from '@domain/DTOs/CreateMessage.Input';
import { PhoneEntity } from '@domain/Entities/Phone.Entity';

export abstract class MessageService {
  abstract createMessage(
    input: CreateMessageInput,
    phone: PhoneEntity,
  ): Promise<unknown>;
  abstract listMessages(): Promise<unknown[]>;
  abstract getMessage(): Promise<unknown>;
  abstract updateMessage(): Promise<unknown>;
  abstract deleteMessage(): Promise<boolean>;
}

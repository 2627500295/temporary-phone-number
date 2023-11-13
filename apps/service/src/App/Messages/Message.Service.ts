import { CreateMessageInput } from '@domain/DTOs/CreateMessage.Input';
import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';

export abstract class MessageService {
  abstract createMessage(
    input: CreateMessageInput,
    phone: PhoneNumberEntity,
  ): Promise<unknown>;
  abstract listMessages(): Promise<unknown[]>;
  abstract getMessage(): Promise<unknown>;
  abstract updateMessage(): Promise<unknown>;
  abstract deleteMessage(): Promise<boolean>;
}

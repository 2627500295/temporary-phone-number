export abstract class MessageService {
  abstract createMessage(): Promise<unknown>;
  abstract listMessages(): Promise<unknown[]>;
  abstract getMessage(): Promise<unknown>;
  abstract updateMessage(): Promise<unknown>;
  abstract deleteMessage(): Promise<boolean>;
}

import { Injectable } from '@nestjs/common';
import { MessageService } from './Message.Service';

@Injectable()
export class MessageServiceImpl implements MessageService {
  createMessage(): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  deleteMessage(): Promise<boolean> {
    return Promise.resolve(false);
  }

  getMessage(): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  listMessages(): Promise<unknown[]> {
    return Promise.resolve([]);
  }

  updateMessage(): Promise<unknown> {
    return Promise.resolve(undefined);
  }
}

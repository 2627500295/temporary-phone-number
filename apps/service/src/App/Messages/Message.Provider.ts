import { MessageService } from './Message.Service';
import { MessageServiceImpl } from './Message.ServiceImpl';
import { ClassProvider } from '@nestjs/common';

export const MessageProvider: ClassProvider = {
  provide: MessageService,
  useClass: MessageServiceImpl,
};

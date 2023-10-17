import { Controller, Get } from '@nestjs/common';
import { MessageService } from '@app/Messages/Message.Service';

@Controller('message')
export class MessageController {
  public constructor(private readonly messageService: MessageService) {}
}

import { Controller, Post } from '@nestjs/common';

import { MessageService } from '@app/Messages/Message.Service';
import { ReceiveService } from '@app/Receives/Receive.Service';
import { PushMessageInput } from '@domain/DTOs/Message/PushMessage.Input';

@Controller('sms')
export class MessageController {
  public constructor(
    private readonly messageService: MessageService,
    private readonly phoneService: ReceiveService,
  ) {}

  /**
   * Push Message
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/post/api_resellers_addMessage
   *
   * @param body
   *
   * @privateRemarks
   * > **IMPORTANT NOTE!**
   * >
   * > 1
   * >
   * > 2
   */
  @Post('push')
  public async push(body: PushMessageInput) {
    return body;
  }

  /**
   *
   */
}

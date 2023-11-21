import { Body, Controller, Post } from '@nestjs/common';

import { MessageService } from '@app/Messages/Message.Service';
import { PhoneNumberService } from '@app/PhoneNumber/PhoneNumber.Service';

import { PushMessageInput } from '@domain/DTOs/Message/PushMessage.Input';

@Controller('messages')
export class MessageController {
  public constructor(
    private readonly messageService: MessageService,
    private readonly phoneNumberService: PhoneNumberService,
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
  public async push(@Body() input: PushMessageInput) {
    return this.messageService.createMessage(input);
  }

  /**
   *
   */
}

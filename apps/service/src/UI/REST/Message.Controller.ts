import { Body, Controller, Post, Sse } from '@nestjs/common';

import { MessageService } from '@app/Messages/Message.Service';
import { PhoneNumberService } from '@app/PhoneNumber/PhoneNumber.Service';

import { PushMessageInput } from '@domain/DTOs/Message/PushMessage.Input';
import { Observable } from 'rxjs';

@Controller('messages')
export class MessageController {
  public constructor(
    private readonly messageService: MessageService,
    private readonly phoneNumberService: PhoneNumberService,
  ) {}

  // SSE
  // https://medium.com/using-nestjs-sse-for-updating-front-end/backend-implementation-cedd3801c210
  // private eventEmitter: EventEmitter2,

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

  @Sse(':phoneNumber')
  sse(): Observable<MessageEvent> {
    return;
  }

  /**
   *
   */
}

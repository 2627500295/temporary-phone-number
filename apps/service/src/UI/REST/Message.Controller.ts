import { Body, Controller, Param, Post, Sse } from '@nestjs/common';

import { MessageService } from '@app/Messages/Message.Service';
import { PhoneNumberService } from '@app/PhoneNumber/PhoneNumber.Service';

import { PushMessageInput } from '@domain/DTOs/Message/PushMessage.Input';
import { fromEvent, map, Observable, filter } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessagePushedEvent } from '@ui/Events/MessagePushed.Event';

@Controller('messages')
export class MessageController {
  public constructor(
    private readonly messageService: MessageService,
    private readonly phoneNumberService: PhoneNumberService,
    private eventEmitter: EventEmitter2,
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
    const message = await this.messageService.createMessage(input);

    this.eventEmitter.emit(
      'message.pushed',
      new MessagePushedEvent({
        content: message.content,
        phoneNumber: message.phoneNumber,
        from: message.form,
        receivedAt: message.receivedAt,
      }),
    );

    return message;
  }

  @Sse(':phoneNumber')
  sse(@Param('phoneNumber') phoneNumber: string): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'message.pushed').pipe(
      filter((data: any) => {
        console.log(data, phoneNumber);
        return data.phoneNumber === phoneNumber;
      }),
      map((data) => {
        return new MessageEvent<any>('message', { data });
      }),
    );
  }

  /**
   *
   */
}

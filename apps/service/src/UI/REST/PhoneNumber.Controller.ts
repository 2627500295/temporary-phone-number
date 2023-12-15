import { Body, Controller, Delete, Get, Param, Post, Put, Query, Sse } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { filter, fromEvent, map, Observable } from 'rxjs';

import { OnlineReportInput } from '../../Domain/DTOs/PhoneNumber/OnlineReport.Input';
import { CreateNumberInput } from '../../Domain/DTOs/PhoneNumber/CreateNumber.Input';
import { DeleteNumberDTO } from '../../Domain/DTOs/PhoneNumber/DeleteNumber.DTO';
import { ReportOnlineDTO } from '../../Domain/DTOs/PhoneNumber/ReportOnline.DTO';
import { PushMessageInput } from '../../Domain/DTOs/Message/PushMessage.Input';
import { MessagePushedEvent } from '../../Domain/Events/MessagePushed.Event';
import { ListPhonesInput } from '../../Domain/DTOs/ListPhones.Input';

import { PhoneNumberService } from '../../App/PhoneNumber/PhoneNumber.Service';
import { MessageService } from '../../App/Messages/Message.Service';

@Controller('numbers')
export class PhoneNumberController {
  public constructor(
    private readonly message: MessageService,
    private readonly phoneNumber: PhoneNumberService,

    // SSE
    // https://medium.com/using-nestjs-sse-for-updating-front-end/backend-implementation-cedd3801c210
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * List Phone numbers (获取手机号码列表)
   */
  @ApiTags('Phone Number')
  @ApiOperation({ summary: 'List Phone numbers' })
  @Get()
  public async listPhoneNumber(@Query() query: ListPhonesInput) {
    return this.phoneNumber.listPhones(query);
  }

  /**
   * Insert phone number (添加手机号码)
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/post/api_resellers_addNumber
   *
   *
   */
  @ApiTags('Phone Number')
  @ApiOperation({ summary: 'Create a Phone number' })
  @Post()
  public async createPhoneNumber(@Body() body: CreateNumberInput) {
    return this.phoneNumber.createPhone(body);
  }

  @ApiTags('Phone Number')
  @ApiOperation({ summary: 'Retrieve a Phone number' })
  @Get(':phoneNumber')
  public async retrievePhoneNumber(@Body() body: CreateNumberInput) {
    return {};
  }

  @ApiTags('Phone Number')
  @ApiOperation({ summary: 'Update a Phone number' })
  @Put(':phoneNumber')
  public async updatePhoneNumber(@Body() body: CreateNumberInput) {
    return {};
  }

  /**
   * Delete phone number (删除手机号码)
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/delete/api_resellers_removeNumber
   *
   *
   */
  @ApiTags('Phone Number')
  @ApiOperation({ summary: 'Delete a Phone number' })
  @Delete(':phoneNumber')
  public async deletePhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const deletePhoneNumberDTO: DeleteNumberDTO = { phoneNumber };
    return this.phoneNumber.deletePhone(deletePhoneNumberDTO);
  }

  /**
   * Phone number online report (报告手机号码在线)
   *
   * 每 30分钟 上报一次在线状态
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/post/api_resellers_sendNumbersOnline
   *
   * @remarks
   *
   * > **IMPORTANT NOTE!**
   * >
   * > 1
   * >
   * > 2
   *
   * insdsddfs
   *
   * 23442342
   *
   * > **IMPORTANT NOTE!**
   * >
   * > 1
   * >
   * > 2
   *
   * > **IMPORTANT NOTE!**
   * >
   * > 1
   * >
   * > 2
   */
  @ApiTags('Phone Number')
  @ApiOperation({ summary: 'Online report' })
  @Post(':phoneNumber/online')
  public async reportPhoneNumberOnline(@Param('phoneNumber') phoneNumber: string, @Body() body: OnlineReportInput) {
    const reportOnlineDTO: ReportOnlineDTO = {
      phoneNumber,
      reportedAt: body.reportedAt ?? new Date().toISOString(),
    };

    return this.phoneNumber.reportOnline(reportOnlineDTO);
  }

  //
  // SMS
  //

  @ApiTags('SMS')
  @ApiOperation({ summary: 'List SMS by Phone Number' })
  @Get(':phoneNumber/sms')
  public async listMessage(@Param('phoneNumber') phoneNumber: string) {
    return this.message.listMessages(phoneNumber);
  }

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
  @ApiTags('SMS')
  @ApiOperation({ summary: 'Push SMS by Phone Number' })
  @Post(':phoneNumber/sms/push')
  public async push(@Param('phoneNumber') phoneNumber: string, @Body() input: PushMessageInput) {
    const message = await this.message.createMessage({ ...input, phoneNumber });

    this.eventEmitter.emit(
      'message.pushed',
      new MessagePushedEvent({
        content: message.content,
        phoneNumber: message.phoneNumber,
        from: message.from,
        receivedAt: message.receivedAt,
      }),
    );

    return message;
  }

  @ApiOperation({ summary: 'New SMS notifications by Phone Number' })
  @ApiTags('SMS')
  @ApiProduces('text/event-stream')
  @Sse(':phoneNumber/sms/sse')
  sse(@Param('phoneNumber') phoneNumber: string): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'message.pushed').pipe(
      filter((data: any) => data.phoneNumber === phoneNumber),
      map((data) => new MessageEvent<any>('message', { data })),
    );
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MessageService } from '@app/Messages/Message.Service';
import { CreateMessageInput } from '@domain/DTOs/CreateMessage.Input';
import { PhoneService } from '@app/Phones/Phone.Service';
import { PhoneEntity } from '@domain/Entities/Phone.Entity';

@Controller('messages')
export class MessageController {
  public constructor(
    private readonly messageService: MessageService,
    private readonly phoneService: PhoneService,
  ) {}

  @Post()
  public async createMessage(
    @Body() input: CreateMessageInput,
    // @Param('phoneId', ParseIntPipe) phoneId: number,
  ) {
    // const phone = await this.phoneService.
    const phone = { id: 1, phoneNumber: '17207277520' } as PhoneEntity;
    return this.messageService.createMessage(input, phone);
  }
}

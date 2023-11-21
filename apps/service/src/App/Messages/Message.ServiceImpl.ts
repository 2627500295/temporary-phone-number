import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageEntity } from '@domain/Entities/Message.Entity';

import { MessageService } from './Message.Service';
import { CreateMessageInput } from '@domain/DTOs/CreateMessage.Input';
import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { PushMessageInput } from '@domain/DTOs/Message/PushMessage.Input';

@Injectable()
export class MessageServiceImpl implements MessageService {
  public constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(input: PushMessageInput): Promise<MessageEntity> {
    const entity = this.messageRepository.create(input);
    return this.messageRepository.save(entity);
  }

  // deleteMessage(): Promise<boolean> {
  //   return Promise.resolve(false);
  // }

  // getMessage(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }

  // listMessages(): Promise<unknown[]> {
  //   return Promise.resolve([]);
  // }

  // updateMessage(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }
}

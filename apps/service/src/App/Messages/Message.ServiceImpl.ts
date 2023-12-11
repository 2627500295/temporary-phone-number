import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';

import { MessageEntity } from '@domain/Entities/Message.Entity';

import { MessageService } from './Message.Service';
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

  async listMessages(phoneNumber: string): Promise<[MessageEntity[], number]> {
    const result = await this.messageRepository.findAndCount({
      skip: 1,
      take: 10,
      order: { id: 'asc' },
      where: {
        phoneNumber,
        id: MoreThanOrEqual(11),
      },
    });

    console.log(result);

    return result;
  }

  // where: { id: 1 },

  // updateMessage(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }
}

// if (response.status >= 200 && response.status =< 299) {
//
// }

// Object.fromEntries(response.headers)["content-type"].includes('json')

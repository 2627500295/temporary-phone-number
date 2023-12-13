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

// https://data.services.jetbrains.com/products?code=IIU&release.type=release&fields=name%2Ccode%2Clink&_=1702364566349

// https://data.services.jetbrains.com/products?code=IIU%2CFL&release.type=preview%2Ceap%2Crc%2Crelease&fields=name%2Creleases&latest=true&_=1702364318370

// ---

// https://data.services.jetbrains.com/products/releases?code=IIU&latest=true&type=release&build=&_=1702364566350

// https://data.services.jetbrains.com/products/releases?code=IIU%2CIIC&latest=true&type=release&build=&_=1702364668720

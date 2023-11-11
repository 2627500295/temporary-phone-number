import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ReceiveEntity } from '@domain/Entities/Receive.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';
import { PhoneListVO } from '@domain/ValueObjects/PhoneList.VO';
import { ListPhonesInput } from '@domain/DTOs/ListPhones.Input';

import { ReceiveService } from './Receive.Service';

@Injectable()
export class ReceiveServiceImpl implements ReceiveService {
  public constructor(
    @InjectRepository(ReceiveEntity)
    private readonly phoneRepository: Repository<ReceiveEntity>,
  ) {}

  public async createPhone(body: CreatePhoneInput): Promise<any> {
    const entity = this.phoneRepository.create(body);
    return this.phoneRepository.save(entity);
  }

  // deletePhone(): Promise<boolean> {
  //   return Promise.resolve(false);
  // }
  //
  // getPhone(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }
  //
  async listPhones({
    pageNumber = 1,
    pageSize = 10,
  }: ListPhonesInput): Promise<PhoneListVO> {
    const [list, count] = await this.phoneRepository.findAndCount({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });
    return new PhoneListVO(list, count);
  }

  // updatePhone(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }
}

// offset = (pageNumber - 1) * pageSize
// limit = pageSize

// skip = (pageNumber - 1) * pageSize
// take = pageSize

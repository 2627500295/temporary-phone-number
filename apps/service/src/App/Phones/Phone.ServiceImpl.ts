import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';

import { PhoneService } from './Phone.Service';

@Injectable()
export class PhoneServiceImpl implements PhoneService {
  public constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
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
  // listPhones(): Promise<unknown[]> {
  //   return Promise.resolve([]);
  // }
  //
  // updatePhone(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }
}

import { Injectable } from '@nestjs/common';
import { PhoneService } from './Phone.Service';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { Repository } from 'typeorm';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';

@Injectable()
export class PhoneServiceImpl implements PhoneService {
  public constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
  ) {}

  public async createPhone(body: CreatePhoneInput): Promise<any> {
    const entity = this.phoneRepository.create(body);
    const found = await this.phoneRepository.findOneBy(body);
    if (found) return found;
    return this.phoneRepository.save(entity);
  }

  //
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

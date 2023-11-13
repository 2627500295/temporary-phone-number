import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';
import { PhoneListVO } from '@domain/ValueObjects/PhoneList.VO';
import { ListPhonesInput } from '@domain/DTOs/ListPhones.Input';

import { PhoneNumberService } from './PhoneNumber.Service';
import { CreateNumberInput } from '@domain/DTOs/PhoneNumber/CreateNumber.Input';
import { ReportOnlineDTO } from '@domain/DTOs/PhoneNumber/ReportOnline.DTO';
import { DeleteNumberDTO } from '@domain/DTOs/PhoneNumber/DeleteNumber.DTO';

@Injectable()
export class PhoneNumberServiceImpl implements PhoneNumberService {
  public constructor(
    @InjectRepository(PhoneNumberEntity)
    private readonly phoneRepository: Repository<PhoneNumberEntity>,
  ) {}

  public async createPhone(body: CreateNumberInput): Promise<any> {
    const entity = this.phoneRepository.create(body);
    return this.phoneRepository.save(entity);
  }

  public async reportOnline(body: ReportOnlineDTO): Promise<any> {
    const entity = await this.phoneRepository.findOneBy({
      phoneNumber: `${body.phoneNumber}`,
    });

    const merged = this.phoneRepository.merge(entity, body);

    return this.phoneRepository.save(merged);
  }

  async deletePhone(body: DeleteNumberDTO): Promise<boolean> {
    await this.phoneRepository.delete({
      phoneNumber: body.phoneNumber,
    });

    return true;
  }

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

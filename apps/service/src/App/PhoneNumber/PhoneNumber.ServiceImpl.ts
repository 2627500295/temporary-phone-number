import { BadRequestException, Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PhoneNumberEntity } from '../../Domain/Entities/PhoneNumber.Entity';
import { PhoneListVO } from '../../Domain/ValueObjects/PhoneList.VO';
import { ListPhonesInput } from '../../Domain/DTOs/ListPhones.Input';

import { PhoneNumberService } from './PhoneNumber.Service';
import { CreateNumberInput } from '../../Domain/DTOs/PhoneNumber/CreateNumber.Input';
import { ReportOnlineDTO } from '../../Domain/DTOs/PhoneNumber/ReportOnline.DTO';
import { DeleteNumberDTO } from '../../Domain/DTOs/PhoneNumber/DeleteNumber.DTO';
import { BusinessError } from '../../Infra/Enums/BusinessError.Enum';
import { ObjectId } from 'typeorm/driver/mongodb/typings';
import { MessageEntity } from '../../Domain/Entities';
import { parsePhoneNumber } from 'libphonenumber-js/max';
import { getCountries } from 'libphonenumber-js';
import { countries, getCountryCode, getCountryData, TCountryCode } from 'countries-list';
import { path } from 'ramda';

@Injectable()
export class PhoneNumberServiceImpl implements PhoneNumberService {
  public constructor(
    @InjectRepository(PhoneNumberEntity)
    private readonly phoneRepository: Repository<PhoneNumberEntity>,
  ) {}

  public async createPhone(body: CreateNumberInput): Promise<any> {
    const found = await this.phoneRepository.findOneBy({ phoneNumber: body.phoneNumber });
    if (found) throw new BadRequestException(BusinessError.PHONE_NUMBER_DUPLICATE);
    const entity = this.phoneRepository.create(body);
    return this.phoneRepository.save(entity);
  }

  public async reportOnline(body: ReportOnlineDTO): Promise<any> {
    const entity = await this.phoneRepository.findOneBy({ phoneNumber: body.phoneNumber });
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
  async listPhones({ pageNumber = 1, pageSize = 10, isOnline = false }: ListPhonesInput): Promise<PhoneListVO> {
    const where: Record<string, any> = {};
    if (isOnline) where.reportedAt = Raw((alias) => `${alias} >= CURRENT_TIMESTAMP - INTERVAL '1 HOUR'`);

    const [list, count] = await this.phoneRepository.findAndCount({
      skip: (pageNumber - 1) * pageSize,
      // join: {},
      // relations: {
      //   smsCount: '',
      // },
      take: pageSize,
      where,
    });

    // const result = await this.phoneRepository
    //   .createQueryBuilder('PhoneNumbers')
    //   .select('*')
    //   .addSelect((qb) =>
    //     qb
    //       .select('received_at')
    //       .from(MessageEntity, 'sms')
    //       .where('PhoneNumbers.phoneNumber = sms.phoneNumber')
    //       .orderBy('received_at')
    //       .limit(1),
    //   )
    //   .addSelect((qb) =>
    //     qb
    //       .select('COUNT(1)', 'smsCount')
    //       .from(MessageEntity, 'sms')
    //       .where('PhoneNumbers.phoneNumber = sms.phoneNumber'),
    //   )
    //   .where({ reportedAt: Raw((alias) => `${alias} >= CURRENT_TIMESTAMP - INTERVAL '1 HOUR'`) })
    //   .getRawMany();

    return new PhoneListVO(list, count);
  }

  // updatePhone(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }
}

function getCountryName(code: TCountryCode) {
  return path([code, 'name'], countries);
}

function getCountryCodeByPhoneNumber(phoneNumber: number | `${number}` | `+${number}`) {
  const number = `${phoneNumber}`.startsWith('+') ? `${phoneNumber}` : `+${phoneNumber}`;
  return parsePhoneNumber(number).country as string;
}

// offset = (pageNumber - 1) * pageSize
// limit = pageSize

// skip = (pageNumber - 1) * pageSize
// take = pageSize

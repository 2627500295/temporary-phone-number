import { BadRequestException, Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ObjectId } from 'typeorm/driver/mongodb/typings';
import { parsePhoneNumber } from 'libphonenumber-js/max';
import { getCountries } from 'libphonenumber-js';
import { countries, getCountryCode, getCountryData, TCountryCode } from 'countries-list';
import { path } from 'ramda';
import { plainToClass, plainToInstance } from 'class-transformer';
import { MessageEntity } from '../../Domain/Entities';
import { BusinessError } from '../../Infra/Enums/BusinessError.Enum';
import { DeleteNumberDTO } from '../../Domain/DTOs/PhoneNumber/DeleteNumber.DTO';
import { ReportOnlineDTO } from '../../Domain/DTOs/PhoneNumber/ReportOnline.DTO';
import { CreateNumberInput } from '../../Domain/DTOs/PhoneNumber/CreateNumber.Input';
import { ListPhonesInput } from '../../Domain/DTOs/ListPhones.Input';
import { PhoneListVO } from '../../Domain/ValueObjects/PhoneList.VO';
import { PhoneNumberEntity } from '../../Domain/Entities/PhoneNumber.Entity';
import { PhoneNumberVO } from '../../Domain/ValueObjects/PhoneNumber.VO';
import { PhoneNumberService } from './PhoneNumber.Service';

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
    if (isOnline)
      where.reportedAt = Raw((alias) => `${alias} >= TIMEZONE('UTC', CURRENT_TIMESTAMP) - INTERVAL '1 HOUR'`);

    const count = await this.phoneRepository.count({ where });

    const queryBuilder = this.phoneRepository
      .createQueryBuilder('PhoneNumbers')
      .select('*')
      .addSelect((qb) =>
        qb
          .select('received_at')
          .from(MessageEntity, 'sms')
          .where('PhoneNumbers.phoneNumber = sms.phoneNumber')
          .orderBy('received_at')
          .limit(1),
      )
      .addSelect((qb) =>
        qb
          .select('COUNT(1)', 'sms_count')
          .from(MessageEntity, 'sms')
          .where('PhoneNumbers.phoneNumber = sms.phoneNumber'),
      )
      .take(pageSize)
      .offset((pageNumber - 1) * pageSize);

    if (isOnline) {
      queryBuilder.where(where);
    }

    // How do I get the current unix timestamp from PostgreSQL?
    // https://dba.stackexchange.com/questions/2796/how-do-i-get-the-current-unix-timestamp-from-postgresql
    const raws = await queryBuilder.getRawMany();

    const response = plainToInstance(PhoneNumberVO, raws, { excludeExtraneousValues: true });

    return new PhoneListVO(response, count);
  }

  // updatePhone(): Promise<unknown> {
  //   return Promise.resolve(undefined);
  // }
}

// offset = (pageNumber - 1) * pageSize
// limit = pageSize

// skip = (pageNumber - 1) * pageSize
// take = pageSize

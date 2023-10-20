import { Body, Controller, ConflictException, Post, Get } from '@nestjs/common';

import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';

import { PhoneService } from '../../App/Phones/Phone.Service';
import { BusinessExceptionStatus } from '@infra/Helpers/BusinessExceptionStatus';
import { ListPhonesInput } from '@domain/DTOs/ListPhones.Input';

@Controller('phones')
export class PhoneController {
  public constructor(private readonly phoneService: PhoneService) {}

  @Post()
  public async createPhone(
    @Body() body: CreatePhoneInput,
  ): Promise<PhoneEntity> {
    try {
      const entity = await this.phoneService.createPhone(body);
      return entity;
    } catch (error: unknown) {
      throw new ConflictException(
        BusinessExceptionStatus.DUPLICATE_PHONE_NUMBER,
      );
    }
  }

  @Get()
  public async listPhones() {
    const input = new ListPhonesInput();
    input.pageSize = 1;
    input.pageSize = 10;
    return this.phoneService.listPhones(input);
  }
}

// error instanceof QueryFailedError
// error.driverError.code === '23505'
// error.driverError.severity === 'ERROR'

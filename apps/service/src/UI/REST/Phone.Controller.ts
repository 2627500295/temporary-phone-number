import { Body, Controller, ConflictException, Post } from '@nestjs/common';

import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';

import { PhoneService } from '../../App/Phones/Phone.Service';

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
    } catch (e) {
      throw new ConflictException({
        statusCode: -40000,
        statusSymbol: 'DUPLICATE_PHONE_NUMBER',
        message: 'Duplicate phone number',
      });
    }
  }
}

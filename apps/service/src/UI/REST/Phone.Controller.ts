import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PhoneEntity } from '@domain/Entities/Phone.Entity';
import { CreatePhoneInput } from '@domain/DTOs/CreatePhone.Input';

import { PhoneService } from '../../App/Phones/Phone.Service';

@Controller('phones')
export class PhoneController {
  public constructor(private readonly phoneService: PhoneService) {}

  @Post()
  public createPhone(@Body() body: CreatePhoneInput): Promise<PhoneEntity> {
    return this.phoneService.createPhone(body);
  }
}

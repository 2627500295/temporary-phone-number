import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class CreatePhoneInput {
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;
}

import { IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNumberDTO {
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;
}

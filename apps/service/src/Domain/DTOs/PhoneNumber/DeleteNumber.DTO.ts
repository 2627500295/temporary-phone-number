import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNumberDTO {
  @ApiProperty()
  @IsString()
  phoneNumber: string;
}

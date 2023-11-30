import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsPhoneNumber } from 'class-validator';

export class ReportOnlineDTO {
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  reportedAt: string;
}

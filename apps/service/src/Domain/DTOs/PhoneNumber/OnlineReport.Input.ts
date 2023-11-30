import { IsDate, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnlineReportInput {
  @ApiProperty()
  @IsDate()
  @IsOptional()
  reportedAt?: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  from?: string;
}

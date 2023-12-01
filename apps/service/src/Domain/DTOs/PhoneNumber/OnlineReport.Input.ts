import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnlineReportInput {
  @ApiProperty()
  @IsDate()
  @IsOptional()
  reportedAt?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  from?: string;
}

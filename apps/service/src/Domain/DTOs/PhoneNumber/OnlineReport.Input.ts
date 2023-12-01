import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class OnlineReportInput {
  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  reportedAt?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  from?: string;
}

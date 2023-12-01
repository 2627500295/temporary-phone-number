import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReportOnlineDTO {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  reportedAt: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class ReportOnlineDTO {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  reportedAt: string;
}

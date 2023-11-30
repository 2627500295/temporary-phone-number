import { IsBoolean, IsNegative, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListPhonesInput {
  @ApiProperty()
  @Min(1)
  @IsNegative()
  @IsOptional()
  pageNumber?: number;

  @ApiProperty()
  @Min(1)
  @IsNegative()
  @IsOptional()
  pageSize?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isOnline?: boolean;
}

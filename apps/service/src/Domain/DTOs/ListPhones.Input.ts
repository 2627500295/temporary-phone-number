import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNegative, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

import { toBoolean } from '../../Infra/Utils';

export class ListPhonesInput {
  @ApiProperty({ required: false })
  @Min(1)
  @IsNegative()
  @IsOptional()
  pageNumber?: number;

  @ApiProperty({ required: false })
  @Min(1)
  @IsNegative()
  @IsOptional()
  pageSize?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  @IsOptional()
  isOnline?: boolean;
}

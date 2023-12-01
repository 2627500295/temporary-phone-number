import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PushMessageInput {
  /** 手机号码 */
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  /** 来源 */
  @ApiProperty()
  @IsString()
  from: string;

  /** 内容 */
  @ApiProperty()
  @IsString()
  content: string;

  /** 收取时间 */
  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  receivedAt?: string;
}

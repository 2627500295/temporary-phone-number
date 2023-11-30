import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class PushMessageInput {
  /** 手机号码 */
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;

  /** 来源 */
  @ApiProperty()
  @IsPhoneNumber()
  from: string;

  /** 内容 */
  @ApiProperty()
  @IsString()
  content: string;

  /** 收取时间 */
  @ApiProperty()
  @IsDate()
  @IsOptional()
  receivedAt?: string;
}

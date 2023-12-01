import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMessageInput {
  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  public receivedAt: string;

  @ApiProperty()
  @IsString()
  public content: string;

  @ApiProperty()
  @IsString()
  public from: string;
}

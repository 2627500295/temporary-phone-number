import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateMessageInput {
  @ApiProperty()
  @IsDate()
  public receivedAt: string;

  @ApiProperty()
  @IsString()
  public content: string;

  @ApiProperty()
  @IsString()
  public from: string;
}

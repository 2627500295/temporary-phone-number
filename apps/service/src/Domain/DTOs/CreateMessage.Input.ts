import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsPhoneNumber, IsString } from 'class-validator';

export class CreateMessageInput {
  @ApiProperty()
  @IsDate()
  public receivedAt: string;

  @ApiProperty()
  @IsString()
  public content: string;

  @ApiProperty()
  @IsPhoneNumber()
  public from: string;
}

import { PhoneNumberRent } from './PhoneNumberRent.Enum';
import { IsEnum, Length, IsNumber, IsOptional, Min, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNumberInput {
  @ApiProperty({
    description: 'Phone number in international format',
    required: true,
    type: String,
    examples: ['12096777520', '8615347033520'],
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Phone number country code',
    required: true,
    type: Number,
    examples: [1, 86],
  })
  @Min(1)
  @IsNumber()
  countryCode: number;

  @ApiProperty({
    description: 'Phone number rent mode',
    required: true,
    enum: PhoneNumberRent,
  })
  @IsEnum(PhoneNumberRent)
  rent: PhoneNumberRent;

  /**
   * Operator Code
   *
   * @remarks
   *
   * MCC + MNC (first 5 digits of IMSI)
   *
   * @privateRemarks
   *
   * Google Fi 310260
   *
   * IMSI Search
   * https://www.heicard.com/operator
   * http://ultra.chinasnow.net/opcode
   * https://www.revealname.com/lookup/+12096777520
   */
  @ApiProperty({
    description: 'Phone number operator Code',
    required: false,
    type: Number,
    example: 310260,
  })
  @Length(6, 6)
  @IsNumber()
  @IsOptional()
  operator: number;

  @ApiProperty({
    description: 'Phone number description',
    required: false,
    type: Number,
    example: 'SIM 1',
  })
  @IsString()
  @IsOptional()
  description: string;
}

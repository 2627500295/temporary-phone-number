import { PhoneNumberRent } from './PhoneNumberRent.Enum';

export class CreateNumberInput {
  /**
   * Number in international format (with `+` sign)
   *
   * @required
   */
  phoneNumber: string;

  /**
   * Country code
   *
   * @required
   */
  countryCode: number;

  /**
   * Rent mode
   *
   * @required
   */
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
   * IMSI Search https://www.heicard.com/operator / http://ultra.chinasnow.net/opcode / https://www.revealname.com/lookup/+12096777520
   */
  operator: number;

  description: string;
}

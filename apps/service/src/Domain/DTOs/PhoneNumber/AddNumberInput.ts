import { NumberRent } from './NumberRent';

export class AddNumberInput {
  /**
   * Number in international format (with `+` sign)
   *
   * @required
   */
  number: string;

  /**
   * Country code
   *
   * @required
   */
  country: string;

  // /**
  //  * Rent mode
  //  *
  //  * @required
  //  */
  // rent: NumberRent;

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

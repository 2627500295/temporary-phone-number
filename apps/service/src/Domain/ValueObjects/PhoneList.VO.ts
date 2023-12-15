import { PhoneNumberVO } from './PhoneNumber.VO';

export class PhoneListVO {
  constructor(
    public readonly list: PhoneNumberVO[],
    public readonly count: number,
  ) {}
}

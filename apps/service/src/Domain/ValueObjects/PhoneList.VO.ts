import { PhoneNumberEntity } from '../Entities/PhoneNumber.Entity';

export class PhoneListVO {
  constructor(
    public readonly list: PhoneNumberEntity[],
    public readonly count: number,
  ) {}
}

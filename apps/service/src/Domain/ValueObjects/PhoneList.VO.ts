import { PhoneNumberEntity } from '@domain/Entities/PhoneNumber.Entity';

export class PhoneListVO {
  constructor(
    public readonly list: PhoneNumberEntity[],
    public readonly count: number,
  ) {}
}

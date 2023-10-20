import { PhoneEntity } from '@domain/Entities/Phone.Entity';

export class PhoneListVO {
  constructor(
    public readonly list: PhoneEntity[],
    public readonly count: number,
  ) {}
}

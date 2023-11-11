import { ReceiveEntity } from '@domain/Entities/Receive.Entity';

export class PhoneListVO {
  constructor(
    public readonly list: ReceiveEntity[],
    public readonly count: number,
  ) {}
}

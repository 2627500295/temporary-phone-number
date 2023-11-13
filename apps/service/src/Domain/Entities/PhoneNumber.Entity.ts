import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhoneNumberRent } from '@domain/DTOs/PhoneNumber/PhoneNumberRent.Enum';

@Entity('numbers')
export class PhoneNumberEntity {
  @PrimaryGeneratedColumn({
    comment: 'ID',
  })
  public id: number;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Created time',
  })
  public createdAt: string;

  @Index('phone_number_index', { unique: true })
  @Column({
    comment: 'Phone number',
  })
  public phoneNumber: string;

  @Column({
    comment: 'Country code',
  })
  public countryCode: number;

  @Column({
    comment: 'Operator code',
    nullable: true,
  })
  public operator: number;

  @Column({
    comment: 'Description',
    default: '',
  })
  public description: string;

  @Column({
    comment: 'Rent mode',
    default: PhoneNumberRent.DISABLED,
  })
  public rent: number;

  @Column({
    comment: 'Last online date',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  public reportedAt: string;

  @Column({
    name: 'provider',
    comment: 'Number provider',
    nullable: true,
  })
  public user: number;
}

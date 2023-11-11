import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('receives')
export class ReceiveEntity {
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
    name: 'number',
    comment: 'Phone number',
  })
  public phoneNumber: string;

  @Index('country_code_index')
  @Column({
    comment: 'Country code',
  })
  public country: number;

  @Column({
    comment: 'Operator code',
  })
  public operator: number;

  @Column({
    comment: 'Description',
  })
  public description: string;

  @Column({
    comment: 'Rent mode',
  })
  public rent: string;

  @Column({
    name: 'provider',
    comment: 'Number provider',
  })
  public user: number;
}

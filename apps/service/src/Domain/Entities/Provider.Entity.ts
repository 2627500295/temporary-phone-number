import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('providers')
export class ProviderEntity {
  @PrimaryGeneratedColumn({
    comment: 'Provider ID',
  })
  public id: number;

  @CreateDateColumn({
    comment: 'Created time',
    name: 'created_at',
  })
  public createdAt: string;

  @Index('number_index', { unique: true })
  @Column({
    comment: 'Provider phone number',
    name: 'phone',
  })
  public phoneNumber: string;

  @Column({
    name: 'provider',
    comment: 'Provider',
  })
  public provider: string;
}

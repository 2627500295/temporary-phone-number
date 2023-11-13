import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sends')
export class SendEntity {
  @PrimaryGeneratedColumn({ comment: 'Receive ID' })
  public id: number;

  @CreateDateColumn({ name: 'created_at', comment: 'Created time' })
  public createdAt: string;

  @Index('number_index', { unique: true })
  @Column({ name: 'phone', comment: 'Phone number' })
  public phoneNumber: string;

  @Column({ name: 'provider', comment: 'Provider' })
  public provider: string;
}

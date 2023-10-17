import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('phone')
export class PhoneEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  public id: number;

  @CreateDateColumn({ name: 'created_at', comment: 'Created time' })
  public createdAt: string;

  @Index('phone_number_index', { unique: true })
  @Column({ name: 'phone', comment: 'phone number' })
  public phoneNumber: string;
}

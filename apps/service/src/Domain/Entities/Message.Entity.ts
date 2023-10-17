import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  public id: number;

  @CreateDateColumn({ name: 'received_at', comment: 'Received time' })
  public receivedAt: string;

  @Column({ comment: 'Message content' })
  public content: string;

  @Column()
  public phoneId: number;
}

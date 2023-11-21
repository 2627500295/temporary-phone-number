import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  public id: number;

  @Column({
    name: 'received_at',
    comment: 'Received time',
    type: 'timestamp',
  })
  public receivedAt: string;

  @Column({
    comment: 'Message content',
  })
  public content: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public form: string;
}

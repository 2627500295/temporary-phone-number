import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn({
    comment: 'Message ID',
  })
  public id: number;

  @Column({
    comment: 'Message received date',
    name: 'received_at',
    type: 'timestamp',
  })
  public receivedAt: string;

  @Column({
    comment: 'Message content',
  })
  public content: string;

  @Column({
    comment: 'Message receiving phone number',
  })
  public phoneNumber: string;

  @Column({
    comment: 'Message sending phone number',
  })
  public form: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  public id: number;

  @Column({
    name: 'received_at',
    comment: 'Received time',
    type: 'timestamp',
  })
  public receivedAt: string;

  @Column({ comment: 'Message content' })
  public content: string;

  @Column()
  public form: string;

  @Column()
  public to: string;

  @Column()
  public phoneId: number;
}

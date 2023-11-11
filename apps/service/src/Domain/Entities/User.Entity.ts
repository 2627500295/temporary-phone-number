import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: 'User ID' })
  public id: number;

  @CreateDateColumn({ name: 'created_at', comment: 'Created time' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', comment: 'Updated time' })
  public updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', comment: 'Deleted time' })
  public deletedAt: string | null;

  @Column()
  public name: string;
}

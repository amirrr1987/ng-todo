import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task as TaskEntity } from 'src/tasks/entities/task.entity';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  lastName: string;

  @Column({
    type: 'timestamp',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({ default: '' })
  userId: string;

  @OneToMany((_type) => TaskEntity, (task) => task.profile, { eager: true })
  tasks: TaskEntity[];
}

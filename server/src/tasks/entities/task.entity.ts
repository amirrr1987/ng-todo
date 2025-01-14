import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from '../../tasks/dto/base-task.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, comment: 'The title of the task' })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Column({ type: 'boolean', default: false })
  deactivate: boolean;

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

  @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: true })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}

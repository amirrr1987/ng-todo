import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => TaskEntity, { onDelete: 'CASCADE', eager: true })
  @JoinTable({
    name: 'profiles_tasks',
    joinColumn: {
      name: 'profileId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'taskId',
      referencedColumnName: 'id',
    },
  })
  tasks: TaskEntity[];
}

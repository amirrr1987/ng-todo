import { Auth as AuthEntity } from '../../auth/entities/auth.entity';
import { Task as TaskEntity } from '../../tasks/entities/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @OneToOne(() => AuthEntity, (auth) => auth.id, { cascade: true, eager: true })
  @JoinColumn({ name: 'authId' })
  auth: AuthEntity;

  @Column({ name: 'authId' })
  authId: string;

  @ManyToMany(() => TaskEntity, { cascade: true, eager: true })
  @JoinTable({
    name: 'users_tasks', // Renamed table for better context
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
    },
  })
  tasks: TaskEntity[];
}

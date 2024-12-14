import { Auth as AuthEntity } from 'src/auth/entities/auth.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => AuthEntity, (auth) => auth.id)
  auth: AuthEntity;

  @Column({ name: 'authId' })
  authId: string;
}

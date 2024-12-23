import { Profile as ProfileEntity } from 'src/profiles/entities/profile.entity';
import {
  AfterInsert,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

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

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity; // اینجا profile به صورت خودکار به `User` متصل می‌شود

  // @AfterInsert()
  // async createProfile() {
  //   const profile = new Profile();
  //   profile.userId = this.id; // اینجا user.id را به Profile اختصاص می‌دهیم
  //   profile.firstName = ''; // مقدار پیش‌فرض برای firstName
  //   profile.lastName = ''; // مقدار پیش‌فرض برای lastName
  //   await profile.save(); // ذخیره Profile جدید
  // }
}

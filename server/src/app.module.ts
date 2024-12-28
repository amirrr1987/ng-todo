import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '@/tasks/tasks.module';
import { UsersModule } from '@/users/users.module';
import { User as UserEntity } from '@/users/entities/user.entity';
import { Task as TaskEntity } from '@/tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'amir',
      password: '0251',
      database: 'task-management',
      // autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [UserEntity, TaskEntity],
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

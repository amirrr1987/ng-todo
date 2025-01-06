import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '@/tasks/tasks.service';
import { TasksRepository } from '@/tasks/tasks.repository';
import { UserEntity } from '@/users/entities/user.entity';

// type MockRepository = Partial<Record<keyof TasksRepository, jest.Mock>>;

const createMockTasksRepository = () => ({
  getTaskList: jest.fn(),
});

const mockUser: Partial<UserEntity> = {
  username: 'testUser',
  id: 'userId123',
  password: 'password123',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: createMockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('should call TasksRepository.getTaskList and return its result', async () => {
      tasksRepository.getTaskList.mockResolvedValue('MockedValue');
      const result = await tasksService.findAll(null, mockUser);
      expect(result).toEqual('MockedValue');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '@/tasks/tasks.service';
import { TasksRepository } from '@/tasks/tasks.repository';
import { UserEntity } from '@/users/entities/user.entity';
import { TaskStatus } from '../dto/base-task.dto';
import { NotFoundException } from '@nestjs/common';

// type MockRepository = Partial<Record<keyof TasksRepository, jest.Mock>>;

const createMockTasksRepository = () => ({
  getTaskList: jest.fn(),
  findOneBy: jest.fn(),
});

const mockTask = {
  id: 'id',
  title: '',
  description: '',
  status: TaskStatus.TODO,
  deactivate: false,
  createdAt: undefined,
  updatedAt: undefined,
  user: {
    id: 'id',
  },
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
      const result = await tasksService.findAll(null, mockTask);
      expect(result).toEqual('MockedValue');
    });
  });

  describe('getTaskById', () => {
    it('', async () => {
      tasksRepository.findOneBy.mockResolvedValue(mockTask);
      const res = await tasksService.findOne('id', { id: 'id' });
      expect(res).toEqual(mockTask);
    });

    it('not found task', async () => {
      tasksRepository.findOneBy.mockResolvedValue(null);
      expect(tasksService.findOne('id', mockTask)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

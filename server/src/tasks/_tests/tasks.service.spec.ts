import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '@/tasks/tasks.service';
import { TasksRepository } from '@/tasks/tasks.repository';

describe('TasksService', () => {
  let service: TasksService;
  let repository: TasksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, TasksRepository],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});

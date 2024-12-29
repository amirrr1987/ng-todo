import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
  Param,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskRequestDto,
  GetByFilterTaskQueryDto,
  UpdateTaskBodyDto,
  DeleteTaskParamDto,
  GetOneTaskParamDto,
} from './dto';
import { ResponseService } from '@/response/response.service';
import { AuthGuard } from '@nestjs/passport';
import { ITasksController } from './interfaces/tasks.controller.interface';
import { BaseResponse } from './dto/base-task.dto';
import { GetUser } from '@/auth/common/get-user.decorator';
import { UserEntity } from '@/users/entities/user.entity';

@Controller('tasks')
export class TasksController implements ITasksController {
  private logger = new Logger('Task controller');
  constructor(
    private readonly tasksService: TasksService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() dto: CreateTaskRequestDto,
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse> {
    this.logger.verbose(
      `User ${user.username} creating a new task. Data: ${JSON.stringify(dto)}`,
    );
    const id = await this.tasksService.create(dto, user);
    return this.responseService.create(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(
    @Query() query: GetByFilterTaskQueryDto,
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse> {
    this.logger.verbose(
      `User "${user.username} retrieving all tasks. Flitters: ${JSON.stringify(query)}`,
    );
    const tasks = await this.tasksService.findAll(query, user);
    return this.responseService.findAll(tasks);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(
    @Param() param: GetOneTaskParamDto,
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse> {
    const task = await this.tasksService.findOne(param.id, user);
    return this.responseService.findOne(task);
  }

  @Patch()
  @UseGuards(AuthGuard())
  async update(
    dto: UpdateTaskBodyDto,
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse> {
    const task = await this.tasksService.update(dto, user);
    return this.responseService.update(task);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(
    @Param() param: DeleteTaskParamDto,
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse> {
    const taskId = await this.tasksService.remove(param.id, user);
    return this.responseService.remove(taskId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskRequestDto,
  GetByFilterTaskQueryDto,
  UpdateTaskBodyDto,
  DeleteTaskParamDto,
  GetOneTaskParamDto,
} from './dto';
import { ResponseService } from '../response/response.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/common/get-user.decorator';
import { User as UserEntity } from '../users/entities/user.entity';
import { ITasksController } from './interfaces/tasks.controller.interface';
import { BaseResponse } from './dto/base-task.dto';
import { UsersService } from 'src/users/users.service';

@Controller('tasks')
export class TasksController implements ITasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() dto: CreateTaskRequestDto,
    @GetUser() user: UserEntity,
  ): Promise<BaseResponse> {
    // const profile = await this.usersService.findByKeyValue('userId', user.id);
    const id = await this.tasksService.create(dto);
    return this.responseService.create(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(
    @Query() query: GetByFilterTaskQueryDto,
  ): Promise<BaseResponse> {
    const tasks = await this.tasksService.findAll(query);
    return this.responseService.findAll(tasks);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(param: GetOneTaskParamDto): Promise<BaseResponse> {
    const task = await this.tasksService.findOne(param.id);
    return this.responseService.findOne(task);
  }

  @Patch()
  @UseGuards(AuthGuard())
  async update(dto: UpdateTaskBodyDto): Promise<BaseResponse> {
    const task = await this.tasksService.update(dto);
    return this.responseService.update(task);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(param: DeleteTaskParamDto): Promise<BaseResponse> {
    const taskId = await this.tasksService.remove(param.id);
    return this.responseService.remove(taskId);
  }
}

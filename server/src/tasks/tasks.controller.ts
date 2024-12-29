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
    const id = await this.tasksService.create(dto, user);
    console.log('🚀 ~ TasksController ~ id:', id);
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
  async findOne(@Param() param: GetOneTaskParamDto): Promise<BaseResponse> {
    console.log('🚀 ~ TasksController ~ findOne ~ param:', param);
    const task = await this.tasksService.findOne(param.id);
    return this.responseService.findOne(task);
  }

  @Patch()
  // @UseGuards(AuthGuard())
  async update(dto: UpdateTaskBodyDto): Promise<BaseResponse> {
    const task = await this.tasksService.update(dto);
    return this.responseService.update(task);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard())
  async remove(param: DeleteTaskParamDto): Promise<BaseResponse> {
    const taskId = await this.tasksService.remove(param.id);
    return this.responseService.remove(taskId);
  }
}

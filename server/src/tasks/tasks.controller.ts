import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() dto: CreateTaskRequestDto) {
    const id = await this.tasksService.create(dto);
    return this.responseService.create(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query() query: GetByFilterTaskQueryDto) {
    const tasks = await this.tasksService.findAll(query);
    return this.responseService.findAll(tasks);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param() param: GetOneTaskParamDto) {
    const task = await this.tasksService.findOne(param.id);
    return this.responseService.findOne(task);
  }

  @Patch()
  @UseGuards(AuthGuard())
  async update(@Body() dto: UpdateTaskBodyDto) {
    const task = await this.tasksService.update(dto);
    return this.responseService.update(task);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param() param: DeleteTaskParamDto) {
    const taskId = await this.tasksService.remove(param.id);
    return this.responseService.remove(taskId);
  }
}

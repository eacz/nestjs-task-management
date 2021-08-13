import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskStatusDTO } from './dto/update-task.status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  private logger = new Logger('TasksController')
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: getTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks, Filters ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto, user)
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`The user "${user.username}" creating a new Task. Data: ${JSON.stringify(createTaskDTO)}`)
    return this.tasksService.createTask(createTaskDTO, user);
  }
  @Get('/:Id')
  getTaskById(@Param('Id') Id:string, @GetUser() user: User):Promise<Task> {
    return this.tasksService.getTaskById(Id, user);
  }
  @Delete('/:Id')
  deleteTask(@Param('Id') Id:string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(Id, user);
  }
  @Patch('/:Id/status')
  updateTaskStatus(@Param('Id') Id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDTO,  @GetUser() user: User): Promise<Task>{
    const {status} = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(Id, status, user);
  }
}

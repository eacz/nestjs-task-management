import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskStatusDTO } from './dto/update-task.status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: getTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto)
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }
  @Get('/:Id')
  getTaskById(@Param('Id') Id:string):Promise<Task> {
    return this.tasksService.getTaskById(Id);
  }
  @Delete('/:Id')
  deleteTask(@Param('Id') Id:string): Promise<void> {
    return this.tasksService.deleteTask(Id);
  }
  @Patch('/:Id/status')
  updateTaskStatus(@Param('Id') Id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDTO): Promise<Task>{
    const {status} = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(Id, status);
  }
}

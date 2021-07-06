import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }
  @Get('/:Id')
  getTaskById(@Param('Id') Id:string):Task {
    return this.tasksService.getTaskById(Id);
  }
  @Delete('/:Id')
  deleteTask(@Param('Id') Id:string): void {
    this.tasksService.deleteTask(Id);
    return this.tasksService.deleteTask(Id);
  }
}

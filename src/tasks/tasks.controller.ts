import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: getTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto)
    } else {
      return this.tasksService.getAllTasks();
    }
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
  @Patch('/:Id/status')
  updateTaskStatus(@Param('Id') Id: string, @Body('status') status: TaskStatus): Task{
    return this.tasksService.updateTaskStatus(Id, status);
  }
}

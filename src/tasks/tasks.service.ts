import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task{
    const {title, description} = createTaskDTO
    const task: Task = {
      Id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task;
  }

  getTaskById(Id: string): Task{
    return this.tasks.find(task => task.Id === Id)
  }

  deleteTask(Id:string):void{
    this.tasks = this.tasks.filter(task => task.Id !== Id)
  }



}

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: getTasksFilterDto): Task[]{
    const {search, status} = filterDto;
    let tasks = this.getAllTasks();

    if(status){
      console.log(tasks);
      
      
      tasks = tasks.filter(task => task.status === status)
    }

    if(search){
      tasks = tasks.filter(task => {
        if(task.title.includes(search) || task.description.includes(search)){
          return true;
        }
        return false;
      })
    }

    return tasks
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

  updateTaskStatus(Id: string, status: TaskStatus ):Task{
    let taskUpdated: Task;
    this.tasks = this.tasks.map(task => task.Id === Id ? taskUpdated = {...task, status} : task)
    return taskUpdated;
  }


}

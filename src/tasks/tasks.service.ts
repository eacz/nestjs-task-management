import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  //injecting the task repository into the service
  constructor( 
    @InjectRepository(TaskRepository) 
    private taskRespository: TaskRepository
  ){}
  
  getTasks(filterDto: getTasksFilterDto, user: User): Promise<Task[]>{
    return this.taskRespository.getTasks(filterDto, user)
  }

  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRespository.createTask(createTaskDTO, user)
  }

  async getTaskById(Id: string): Promise<Task> {
    const found = await this.taskRespository.findOne(Id)
    if(!found){
      throw new NotFoundException(`Task with Id ${Id} not found`);
    }
    return found
  }

  async deleteTask(Id:string):Promise<void>{
    const { affected } = await this.taskRespository.delete(Id);
    if(affected === 0) {
      throw new NotFoundException(`Task with Id ${Id} not found`)
    }
  }

  async updateTaskStatus(Id: string, status: TaskStatus ):Promise<Task>{
    const task = await this.getTaskById(Id);
    task.status = status;
    await this.taskRespository.save(task);
    return task;
  }


}

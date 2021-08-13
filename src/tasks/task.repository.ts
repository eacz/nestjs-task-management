import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>{
    const {title, description} = createTaskDTO
    const task = await this.create({
      description, 
      title, 
      status: TaskStatus.OPEN,
      user
    })
    await this.save(task);
    return task;
  }

  async getTasks(filter: getTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filter;
    const query = this.createQueryBuilder('task')
    query.where({user});
    
    if(status){
      query.andWhere('task.status = :status', { status })
    }
    if(search){
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR task.description LIKE LOWER(:search))',
        { search: `%${search}%` }
      )
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

const mockTasksRepository = () => ({
  getTasks: jest.fn()
})

const mockUser = {
  username: 'yyo',
  Id: 'a2',
  password: 'passsssword',
  tasks: []
}

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach( async () => {
    //initilize a NestJS module with taskService and taskRepository
    const module = await Test.createTestingModule({
      providers: [TasksService, {provide: TaskRepository, useFactory: mockTasksRepository}],
    }).compile()

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TaskRepository);
  })
  
  describe('getTasks', () => {
    it('should call TaskRepository and return the result', async() => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled()
      tasksRepository.getTasks.mockResolvedValue('SomeValue')
      //call tasksService which should then call the repository's getTasks
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled()
      expect(result).toBe('SomeValue')
    });
  });


});
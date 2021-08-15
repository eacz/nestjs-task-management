import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn()
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

  describe('getTaskById', () => {
    it('should call TaskRepository.findOne and return the result', async () => {
      const mockTask = {
        title:' test title',
        description: 'test description',
        Id: 'asda12',
        status: TaskStatus.OPEN 
      }
      tasksRepository.findOne.mockResolvedValue(mockTask)
      const result = await tasksService.getTaskById('fakeid', mockUser)
      expect(result).toEqual(mockTask)
    });

    it('should call TaskRepository.findOne and handles an error', () => {
      tasksRepository.findOne.mockResolvedValue(null)
      expect(tasksService.getTaskById('something', mockUser)).rejects.toThrow(NotFoundException);
    });
  });


});
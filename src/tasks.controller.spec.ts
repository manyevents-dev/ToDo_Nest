import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskServiceMock } from './mocks/tasks.service.mock';


describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService

  beforeEach(async () => {
    const module : TestingModule = await Test.createTestingModule({
        controllers: [TasksController],
        providers: [{provide: TasksService, useClass: TasksService }]
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
  });

  it('doit échouer si title < 3 char', async () => {
    const id = 1;
    const shortTitle = 'te';
    await expect(tasksController.updateTitle(id, shortTitle)).rejects.toThrow(
      `Titre de l'id : ${id} trop court`
    );
  })
});
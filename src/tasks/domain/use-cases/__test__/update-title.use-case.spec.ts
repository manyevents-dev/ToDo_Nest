import { UpdateTitleUseCase } from '../update-title.use-case';
import { TaskRepositoryPort } from '../../ports/task.repository.port';
import { Task } from '../../entities/task.entity';
import { TaskStatus } from '../../enums/task-status.enum';

describe('UpdateTitleUseCase', () => {
  let updateTitleUseCase: UpdateTitleUseCase;
  let mockRepo: jest.Mocked<TaskRepositoryPort>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };
    updateTitleUseCase = new UpdateTitleUseCase(mockRepo);
  });

  it('doit échouer si le titre < 3 char', async () => {
    const task = new Task('Ancien titre', TaskStatus.NOT_STARTED, 1);
    mockRepo.findById.mockResolvedValue(task);

    await expect(updateTitleUseCase.execute(1, 'AB')).rejects.toThrow('Titre trop court');
  });
});
import { UpdateStatusUseCase } from '../update-status.use-case';
import { TaskRepositoryPort } from '../../../domain/ports/task.repository.port';
import { Task } from '../../../domain/entities/task.entity';
import { TaskStatus } from '../../../domain/enums/task-status.enum';

describe('UpdateStatusUseCase', () => {
  let useCase: UpdateStatusUseCase;
  let mockRepo: jest.Mocked<TaskRepositoryPort>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new UpdateStatusUseCase(mockRepo);
  });

  it('doit échouer si le statut est déjà "done"', async () => {
    const task = new Task('Tâche terminée', TaskStatus.DONE, 1);
    mockRepo.findById.mockResolvedValue(task);

    await expect(useCase.execute(1, TaskStatus.IN_PROGRESS)).rejects.toThrow(
      `Le statut de la tâche 1 est non modifiable`
    );
  });
});
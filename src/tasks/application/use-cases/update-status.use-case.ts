import { TaskRepositoryPort } from '../../domain/ports/task.repository.port';
import { TaskStatus } from '../../domain/enums/task-status.enum';

export class UpdateStatusUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(id: number, newStatus: TaskStatus) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error(`Tâche ${id} introuvable`);
    }

    if (task.status === TaskStatus.DONE) {
      throw new Error(`Le statut de la tâche ${id} est non modifiable`);
    }

    task.status = newStatus;
    return this.taskRepository.save(task);
  }
}
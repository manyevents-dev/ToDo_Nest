import { Task } from '../../domain/entities/task.entity';
import { TaskRepositoryPort } from '../../domain/ports/task.repository.port';

export class GetTasksUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}
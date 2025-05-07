import { TaskRepositoryPort } from '../ports/task.repository.port';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error(`Tâche ${id} introuvable`);
    await this.taskRepository.delete(id);
  }
}
import { TaskRepositoryPort } from '../ports/task.repository.port';

export class UpdateTitleUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(id: number, newTitle: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error(`Tâche ${id} introuvable`);
    if (newTitle.length < 10) throw new Error(`Titre trop court`);

    task.title = newTitle;
    return this.taskRepository.save(task);
  }
}
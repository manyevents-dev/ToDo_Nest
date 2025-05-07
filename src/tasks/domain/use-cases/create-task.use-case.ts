import { TaskStatus } from 'src/tasks/domain/enums/task-status.enum';
import { Task } from '../entities/task.entity';
import { TaskRepositoryPort } from '../ports/task.repository.port';

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(title: string, status: TaskStatus = TaskStatus.NOT_STARTED): Promise<Task> {
    const task = new Task(title, status);
    return this.taskRepository.save(task);
  }
}
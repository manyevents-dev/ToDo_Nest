import { Task } from '../entities/task.entity';

export interface TaskRepositoryPort {
  findById(id: number): Promise<Task | null>;
  save(task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
  findAll():Promise<Task[]>
}
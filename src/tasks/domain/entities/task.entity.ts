import { TaskStatus } from '../enums/task-status.enum';

export class Task {
  constructor(
    public title: string,
    public status: TaskStatus = TaskStatus.NOT_STARTED,
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date,
  ) {}
}
import { TaskStatus } from 'src/tasks/createtask.dto';

export const taskMock = {
  id: 1,
  title: 'Tâche simulée',
  status: TaskStatus.NOT_STARTED,
  created_at: new Date(),
  updated_at: new Date()
};
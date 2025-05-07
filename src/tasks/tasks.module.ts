import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './application/controllers/task.controller';
import { TaskRepository } from './infra/persistence/task.repository';
import { TaskOrmEntity } from './infra/persistence/task.orm-entity';

import { CreateTaskUseCase } from './domain/use-cases/create-task.use-case';
import { UpdateTitleUseCase } from './domain/use-cases/update-title.use-case';
import { DeleteTaskUseCase } from './domain/use-cases/delete-task.use-case';
import { GetTasksUseCase } from './domain/use-cases/get-tasks.use-case';
import { UpdateStatusUseCase } from './domain/use-cases/update-status.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    {
      provide: GetTasksUseCase,
      useFactory: (repo: TaskRepository) => new GetTasksUseCase(repo),
      inject: [TaskRepository],
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (repo: TaskRepository) => new CreateTaskUseCase(repo),
      inject: [TaskRepository],
    },
    {
      provide: UpdateTitleUseCase,
      useFactory: (repo: TaskRepository) => new UpdateTitleUseCase(repo),
      inject: [TaskRepository],
    },
    {
      provide: UpdateStatusUseCase,
      useFactory: (repo: TaskRepository) => new UpdateStatusUseCase(repo),
      inject: [TaskRepository],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (repo: TaskRepository) => new DeleteTaskUseCase(repo),
      inject: [TaskRepository],
    },
  ],
})
export class TasksModule {}
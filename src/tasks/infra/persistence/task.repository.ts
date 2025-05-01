import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepositoryPort } from '../../domain/ports/task.repository.port';
import { Task } from '../../domain/entities/task.entity';
import { TaskOrmEntity } from './task.orm-entity';

@Injectable()
export class TaskRepository implements TaskRepositoryPort {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly ormRepository: Repository<TaskOrmEntity>,
  ) {}
    async findAll(): Promise<Task[]> {
        const entities = await this.ormRepository.find();
        return entities.map(e => new Task(
        e.title,
        e.status,
        e.id,
        e.created_at,
        e.updated_at
        ));
    }

  async findById(id: number): Promise<Task | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    if (!entity) return null;

    return new Task(
      entity.title,
      entity.status,
      entity.id,
      entity.created_at,
      entity.updated_at,
    );
  }

  async save(task: Task): Promise<Task> {
    const entity = this.ormRepository.create(task);
    const saved = await this.ormRepository.save(entity);
    return new Task(
      saved.title,
      saved.status,
      saved.id,
      saved.created_at,
      saved.updated_at,
    );
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
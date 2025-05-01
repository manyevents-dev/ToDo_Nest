import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TaskStatus } from '../../domain/enums/task-status.enum';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.NOT_STARTED })
  status: TaskStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
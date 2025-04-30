import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from "typeorm";
import { TaskStatus } from './tasks/createtask.dto';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.NOT,
    })
    status: TaskStatus;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at:string
}
import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './tasks.entity'
import { TaskStatus } from './tasks/createtask.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        public TasksRepository: Repository<Task>
    ){}

    findAll(): Promise<Task[]>{
        return this.TasksRepository.find();
    }

    findOne(id:number): Promise<Task | null >{
        return this.TasksRepository.findOneBy({ id });
    }

    create(taskData: Partial<Task>): Promise<Task> {
        const task = this.TasksRepository.create(taskData);

        if (task.title.length < 3){
            throw new Error(`Tâche avec l'id ${taskData} introuvable`)
        }

        return this.TasksRepository.save(task);
    }

    async updateAllstatus(id: Array<number>, newStatus:TaskStatus ): Promise<Task[]> {
        const task = await this.TasksRepository.find({
            where: {
                id: In(id),
            },
        })
        task.forEach(task => task.status = newStatus)

        return this.TasksRepository.save(task)
    }

    async updateTitle(id: number, newTitle: string): Promise<Task> {
        const task = await this.TasksRepository.findOneBy({ id });
        if (!task) {
            throw new Error(`Tâche avec l'id ${id} introuvable`);
        }
        if (newTitle.length < 3){
            throw new Error(`Titre de l'id : ${id} trop court`);
        }
        task.title = newTitle;
        return this.TasksRepository.save(task);
    }

    async updateStatus(id: number, newStatus: TaskStatus): Promise<Task> {
        const task = await this.TasksRepository.findOneBy({ id });
        
        if (!task) {
            throw new Error(`Tâche avec l'id ${id} introuvable`);
        }
        if(task.status == 'done'){
            throw new Error(`Le status de la tache : ${id} est non modifiable`);
        }
        task.status = newStatus
        return this.TasksRepository.save(task);
    }
    async deleteTask(id: number): Promise<Task>{
        const task = await this.TasksRepository.findOneBy({ id });
        if (!task) {
            throw new Error(`Tâche avec l'id ${id} introuvable`);
        }
        await this.TasksRepository.delete(id);
        return task
    }
}
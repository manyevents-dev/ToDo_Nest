import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTaskDto, TaskStatus } from './tasks/createtask.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly TasksService: TasksService) {}

    @Get()
    @ApiOperation({ summary: 'Liste des tâches' })
    async findAll(): Promise<Task[]> {
        return this.TasksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number ): Promise<Task | null>{
        return this.TasksService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Créer une nouvelle tâche' })
    async create(@Body() taskData: CreateTaskDto): Promise<Task> {
        return this.TasksService.create(taskData);
    }
    @Patch(':id/title')
    @ApiOperation({ summary: 'Modifier le titre d\'une tâche' })
    async updateTitle(
      @Param('id') id: number,
      @Body('title') title: string
    ): Promise<Task> {
      return this.TasksService.updateTitle(id, title);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Modifier le statut d\'une tâche' })
    async updateStatus(
      @Param('id') id: number,
      @Body('status') status: TaskStatus
    ): Promise<Task> {
      return this.TasksService.updateStatus(id, status);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Suppr une tache '})
    async deleteTask(@Param('id') id: number): Promise<Task>{
      return this.TasksService.deleteTask(id)
    }
}
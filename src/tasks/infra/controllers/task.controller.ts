import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { UpdateTitleUseCase } from '../../application/use-cases/update-title.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks.use-case';
import { UpdateStatusUseCase } from '../../application/use-cases/update-status.use-case';
import { ApiOperation } from '@nestjs/swagger';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTitleDto } from 'src/tasks/dto/update-title.dto';
import { UpdateStatusDto } from 'src/tasks/dto/update-status.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly getTasks: GetTasksUseCase,
    private readonly createTask: CreateTaskUseCase,
    private readonly updateTitle: UpdateTitleUseCase,
    private readonly updateStatuss: UpdateStatusUseCase,
    private readonly deleteTask: DeleteTaskUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Liste des tâches' })
  findAll(){
    return this.getTasks.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  create(@Body() body: CreateTaskDto) {
    return this.createTask.execute(body.title, body.status);
  }

  @Patch(':id/title')
  @ApiOperation({ summary: 'Modifier le titre d\'une tâche' })
  update(@Param('id') id: number, @Body() body: UpdateTitleDto) {
    return this.updateTitle.execute(Number(id), body.title);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Modifier le statut d\'une tâche' })
  updateStatus(@Param('id') id: number, @Body() body: UpdateStatusDto) {
    return this.updateStatuss.execute(Number(id), body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Suppr une tache '})
  delete(@Param('id') id: number) {
    return this.deleteTask.execute(Number(id));
  }
}
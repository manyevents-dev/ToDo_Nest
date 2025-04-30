import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  NOT = 'not_started',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  NOT_STARTED = "NOT_STARTED",
}

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.NOT, description:'status de la tache' })
  status?: TaskStatus;
}
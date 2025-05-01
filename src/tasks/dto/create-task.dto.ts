import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskStatus } from '../domain/enums/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @Length(3)
  title: string;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../domain/enums/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
    @ApiProperty({ enum: TaskStatus })
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
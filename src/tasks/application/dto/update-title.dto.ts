import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTitleDto {
  @ApiProperty()
  @IsString()
  @Length(3)
  title: string;
}
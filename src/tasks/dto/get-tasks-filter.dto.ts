import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from './../task.model';
export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]) // 👈 use @IsIn() decorator to validate the status is one of the values in the array
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

import { Task } from './task.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // we need to make it private so that it won't be modified by other modules which imports this service as well

  getAllTasks():Task[] {
    return this.tasks;
  }
}

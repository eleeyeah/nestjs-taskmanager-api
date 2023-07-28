import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // 👈 inject dep TasksService

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    // console.log('title:', title);
    // console.log('description:', description);

    return this.tasksService.createTask(title, description);
  }
}

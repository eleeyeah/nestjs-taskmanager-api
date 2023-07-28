import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // 👈 inject dep TasksService

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}

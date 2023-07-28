import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // 👈 inject dep TasksService

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    // 👈 use @Param() decorator to get the id from the request
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string, // 👈 use @Param() because we are getting the id from the request params
    @Body('status') status: TaskStatus, // 👈 use @Body() decorator because we are getting the status from the request body
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}

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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // 👈 inject dep TasksService

  // handler  GET TASKS & FILTER TASKS by status and/or search term
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters defined, call tasksService.getTasksWithFilters
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } // else, call tasksService.getAllTasks
    else {
      return this.tasksService.getAllTasks();
    }
  }

  // handler GET TASK BY ID
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    // 👈 use @Param() decorator to get the id from the request
    return this.tasksService.getTaskById(id);
  }

  // handler CREATE TASK
  @Post()
  @UsePipes(ValidationPipe) // 👈 use @UsePipes() decorator to validate the data we get from the request body
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  // handler DELETE TASK
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  // handler UPDATE TASK STATUS
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string, // 👈 use @Param() because we are getting the id from the request params
    @Body('status', TaskStatusValidationPipe) status: TaskStatus, // 👈 use @Body() decorator because we are getting the status from the request body
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}

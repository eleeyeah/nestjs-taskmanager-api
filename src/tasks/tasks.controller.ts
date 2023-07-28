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
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // 👈 inject dep TasksService

  // handler  GET TASKS & FILTER TASKS by status and/or search term
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
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
    @Body('status') status: TaskStatus, // 👈 use @Body() decorator because we are getting the status from the request body
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}

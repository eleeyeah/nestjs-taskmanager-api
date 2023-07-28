import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid'; // this is a library that will generate a unique id for us

// * the Service is a class that will be responsible for handling the business logic of our application.

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // we need to make it private so that it won't be modified by other modules which imports this service as well

  // GET ALL TASKS
  getAllTasks(): Task[] {
    // this method allows the controller to have access to the tasks array
    return this.tasks;
  }

  // CREATE A TASK
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid.v1(), // this will generate a unique id for us
      title,
      description,
      status: TaskStatus.OPEN,
    };
    // push the task to the tasks array
    this.tasks.push(task);
    return task;
  }
}

import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid'; // this is a library that will generate a unique id for us
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// * the Service is a class that will be responsible for handling the business logic of our application.
// * It will be injected into the Controller.
// * The Controller will then be responsible for handling the requests and responses.
// * The Controller will be injected into the Module.
// * The Module will be responsible for handling the imports and exports of our application.
// * The Module will be injected into the main.ts file.
// * The main.ts file will be responsible for starting our application.
// * The main.ts file will be injected into the root directory of our application.

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // we need to make it private so that it won't be modified by other modules which imports this service as well

  // GET ALL TASKS
  getAllTasks(): Task[] {
    // this method allows the controller to have access to the tasks array
    return this.tasks;
  }

  // GET TASKS & FILTER TASKS by status and/or search term
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    // destructure the filterDto object
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasks = this.getAllTasks();

    // filter the tasks by status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // filter the tasks by search term
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  // GET TASK BY ID
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id); // find the task with the same id as the id we passed in
  }

  // CREATE A TASK
  createTask(createTaskDto: createTaskDto): Task {
    // we need to destructure the createTaskDto object
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid.v1(), // this will generate a unique id for us
      title,
      description,
      status: TaskStatus.OPEN,
    };

    // push the task to the tasks array
    this.tasks.push(task);
    return task; // return the task to the controller
  }

  // DELETE A TASK
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id); // filter out the task with the same id as the id we passed in
  }

  // UPDATE A TASK
  updateTaskStatus = (id: string, status: TaskStatus): Task => {
    // find the task with the same id as the id we passed in
    const task = this.getTaskById(id);

    // update the status of the task
    task.status = status;

    // return the updated task
    return task;
  };
}

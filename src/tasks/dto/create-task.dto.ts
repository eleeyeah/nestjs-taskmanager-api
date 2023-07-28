import { IsNotEmpty } from 'class-validator';

export class createTaskDto {
  // we need to validate the data we get from the request body
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

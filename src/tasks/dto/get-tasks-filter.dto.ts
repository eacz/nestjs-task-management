import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class getTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {message: "The task status should be 'OPEN', 'DONE' or 'IN_PROGRESS'", })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;
}
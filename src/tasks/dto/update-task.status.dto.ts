import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus, {message: "The task status should be 'OPEN', 'DONE' or 'IN_PROGRESS'", })
  status: TaskStatus
}
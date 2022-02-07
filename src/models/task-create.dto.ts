import { IsNotEmpty } from "class-validator";

export class TaskCreateDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    priority: string;
    state: string;
    project_id: number;
    user_id: number;
}

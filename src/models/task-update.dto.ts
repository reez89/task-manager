import { IsNotEmpty } from "class-validator";

export class TaskUpdateDto {
    @IsNotEmpty()
    state: string;
}

import { IsNotEmpty } from "class-validator";

export class ProjectCreateDto {
    @IsNotEmpty()
    projectName: string;

    clientName: string;
    expectedDelivery: string;
    status: string;
    client_id: string;
}
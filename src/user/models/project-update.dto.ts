import { IsNotEmpty } from "class-validator";

export class ProjectUpdateDto {
    projectName?: string;
    clientName?: string;
    expectedDelivery?: string;
    status?: string;

}
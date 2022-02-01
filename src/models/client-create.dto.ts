import { IsNotEmpty } from "class-validator";

export class ClientCreateDto {
    @IsNotEmpty()
    name: string;

}
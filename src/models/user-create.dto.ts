import { IsNotEmpty } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    role_id: number;
}
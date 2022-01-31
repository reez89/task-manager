import { IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    role: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    password_confirm: string;
}
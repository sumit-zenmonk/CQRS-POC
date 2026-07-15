import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @MinLength(3)
    password: string;
}
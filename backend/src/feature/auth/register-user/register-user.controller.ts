import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserHandler } from "./register-user.handler";
import { RegisterUserDto } from "./register-user.dto";


@Controller('/register')
export class RegisterUserController {
    constructor(private readonly registerUserHandler: RegisterUserHandler) { }

    @Post()
    async registerUser(@Body() body: RegisterUserDto) {
        return this.registerUserHandler.handle(body);
    }
}

import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserHandler } from "./login-user.handler";
import { LoginUserDto } from "./login-user.dto";


@Controller('/login')
export class LoginUserController {
    constructor(private readonly loginUserHandler: LoginUserHandler) { }

    @Post()
    async loginUser(@Body() body: LoginUserDto) {
        return this.loginUserHandler.handle(body);
    }
}

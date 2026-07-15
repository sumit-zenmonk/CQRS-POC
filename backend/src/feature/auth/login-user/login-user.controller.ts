import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserHandler } from "./login-user.handler";
import { LoginDto } from "./login-user.dto";


@Controller('/login')
export class LoginUserController {
    constructor(private readonly loginUserHandler: LoginUserHandler) { }

    @Post()
    async loginUser(@Body() body: LoginDto) {
        return this.loginUserHandler.handle(body);
    }
}

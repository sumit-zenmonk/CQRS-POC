import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "./login-user.dto";
import { QueryBus } from "@nestjs/cqrs";
import LoginUserQuery from "./login-user.query";

@Controller('/login')
export class LoginUserController {
    constructor(private readonly queryBus: QueryBus) { }

    @Post()
    async loginUser(@Body() body: LoginUserDto) {
        const loginUserQuery = new LoginUserQuery(body);
        return await this.queryBus.execute(loginUserQuery);
    }
}

import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./register-user.dto";
import { CommandBus } from "@nestjs/cqrs";
import RegisterUserCommand from "./register-user.command";

@Controller('/register')
export class RegisterUserController {
    constructor(private readonly commandBus: CommandBus) { }

    @Post()
    async registerUser(@Body() body: RegisterUserDto) {
        const createServiceCommand = new RegisterUserCommand(body);
        return await this.commandBus.execute(createServiceCommand);
    }
}

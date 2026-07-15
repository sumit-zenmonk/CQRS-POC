import { Command } from "@nestjs/cqrs";
import { RegisterUserDto } from "./register-user.dto";

export default class RegisterUserCommand extends Command<unknown> {
    constructor(readonly body: RegisterUserDto) {
        super();
    }
}
import { Query } from "@nestjs/cqrs";
import { LoginUserDto } from "./login-user.dto";

export default class LoginUserQuery extends Query<unknown> {
    constructor(readonly body: LoginUserDto) {
        super();
    }
}
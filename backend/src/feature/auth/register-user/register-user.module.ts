import { Module } from "@nestjs/common";
import { RegisterUserController } from "./register-user.controller";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { BcryptService } from "src/infrastructure/service/bcrypt.service";
import { JwtHelperService } from "src/infrastructure/service/jwt.service";
import RegisterUserCommand from "./register-user.command";
import RegisterUserHandler from "./register-user.handler";

@Module({
    imports: [],
    controllers: [RegisterUserController],
    providers: [JwtHelperService, UserRepository, BcryptService, RegisterUserCommand, RegisterUserHandler],
    exports: [],
})
export class RegisterUserModule { }

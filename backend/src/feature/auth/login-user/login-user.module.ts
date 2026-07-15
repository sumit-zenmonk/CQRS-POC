import { Module } from "@nestjs/common";
import { LoginUserController } from "./login-user.controller";
import { JwtHelperService } from "src/infrastructure/service/jwt.service";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { BcryptService } from "src/infrastructure/service/bcrypt.service";
import LoginUserHandler from "./login-user.handler";
import LoginUserQuery from "./login-user.query";

@Module({
    imports: [],
    controllers: [LoginUserController],
    providers: [JwtHelperService, UserRepository, LoginUserQuery, LoginUserHandler, BcryptService],
    exports: [],
})
export class LoginUserModule { }

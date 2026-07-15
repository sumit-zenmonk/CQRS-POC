import { Module } from "@nestjs/common";
import { LoginUserController } from "./login-user.controller";
import { LoginUserHandler } from "./login-user.handler";
import { JwtHelperService } from "src/infrastructure/service/jwt.service";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { BcryptService } from "src/infrastructure/service/bcrypt.service";

@Module({
    imports: [],
    controllers: [LoginUserController],
    providers: [JwtHelperService, UserRepository, LoginUserHandler, BcryptService],
    exports: [],
})
export class LoginUserModule { }

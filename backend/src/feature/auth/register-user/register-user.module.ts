import { Module } from "@nestjs/common";
import { RegisterUserController } from "./register-user.controller";
import { RegisterUserHandler } from "./register-user.handler";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { BcryptService } from "src/infrastructure/service/bcrypt.service";
import { JwtHelperService } from "src/infrastructure/service/jwt.service";

@Module({
    imports: [],
    controllers: [RegisterUserController],
    providers: [JwtHelperService, UserRepository, RegisterUserHandler, BcryptService],
    exports: [RegisterUserModule],
})
export class RegisterUserModule { }

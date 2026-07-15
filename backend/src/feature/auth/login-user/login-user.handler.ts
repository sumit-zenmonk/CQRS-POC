import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { JwtHelperService } from "src/infrastructure/service/jwt.service";
import { BcryptService } from "src/infrastructure/service/bcrypt.service";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import LoginUserQuery from "./login-user.query";

@QueryHandler(LoginUserQuery)
export default class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtHelperService: JwtHelperService,
        private readonly bcryptService: BcryptService
    ) { }

    async execute(query: LoginUserQuery): Promise<unknown> {
        //check if already exists using this email
        const isUserExists = await this.userRepo.findByEmailOrname(query.body.text, query.body.text);
        if (!isUserExists) {
            throw new BadRequestException('User not Exists with this Email or name');
        }

        //matching password
        const isValid = await this.bcryptService.verifyPassword(query.body.password, isUserExists.password);
        if (!isValid) {
            throw new BadRequestException('Mismatched email or password');
        }

        const token = await this.jwtHelperService.generateJwtToken(isUserExists);
        return {
            message: "Logged In User",
            access_token: token,
            user: {
                username: isUserExists.username,
                email: isUserExists.email,
                uid: isUserExists.uuid,
            }
        }
    }
}

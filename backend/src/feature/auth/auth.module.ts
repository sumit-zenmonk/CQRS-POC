import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { LoginUserModule } from "./login-user/login-user.module";
import { RegisterUserModule } from "./register-user/register-user.module";

@Module({
    imports: [
        LoginUserModule,
        RegisterUserModule,
        RouterModule.register([
            {
                path: 'auth',
                children: [
                    { path: '', module: LoginUserModule },
                    { path: '', module: RegisterUserModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AuthModule { }
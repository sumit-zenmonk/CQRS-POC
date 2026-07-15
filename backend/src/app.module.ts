import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSource } from './infrastructure/database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticateMiddleware } from './infrastructure/middleware/authenticate.middleware';
import { ConfigModule } from '@nestjs/config';
import { JwtHelperService } from './infrastructure/service/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './feature/auth/auth.module';
import { UserRepository } from './infrastructure/repository/user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from './feature/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    CqrsModule.forRoot(),

    TypeOrmModule.forRoot({
      ...dataSource.options,
      retryAttempts: 10,
      retryDelay: 5000
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_REGISTER_SECRET,
      // signOptions: { expiresIn: '60m' },
    }),

    //Modules
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, JwtHelperService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: 'auth/*path', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}

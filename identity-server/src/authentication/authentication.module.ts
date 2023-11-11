import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { UtilityModule } from 'src/utility/utility.module';
import authConstants from './auth-constants';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [UsersModule, UtilityModule, ProductsModule,JwtModule.register({
    secret: authConstants.jwt.secret,
    signOptions: { expiresIn: authConstants.jwt.expirationTime.accessToken },
  }),
  ],
  controllers: [AuthenticationController],
  // providers: [AuthenticationService],
})
export class AuthenticationModule { }

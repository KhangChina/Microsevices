import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { UtilityModule } from 'src/utility/utility.module';
import authConstants from './auth-constants';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from 'src/products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [UsersModule, UtilityModule, ProductsModule, JwtModule.register({
    secret: authConstants.jwt.secret,
    signOptions: { expiresIn: authConstants.jwt.expirationTime.accessToken },
  }),
    ClientsModule.register([
      {
        name: 'OTP_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notify',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'notify-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AuthenticationController],
  // providers: [AuthenticationService],
})
export class AuthenticationModule { }

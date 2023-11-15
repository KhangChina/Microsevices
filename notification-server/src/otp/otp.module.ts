import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MailModule } from 'src/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';

@Module({
  controllers: [OtpController],
  providers: [OtpService],
  imports:[TypeOrmModule.forFeature([Otp]),MailModule]
})

export class OtpModule {}

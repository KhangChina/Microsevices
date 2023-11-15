import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from './otp/otp.module';
import { TemplateModule } from './template/template.module';
import { MailModule } from './mail/mail.module';
import 'dotenv/config'
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: 'root',//process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true, //Create new tb and lose data
    logging:  false,
    autoLoadEntities: true,
  }), OtpModule, TemplateModule, MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

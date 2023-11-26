import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InformationExtendModule } from './information-extend/information-extend.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  }),InformationExtendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

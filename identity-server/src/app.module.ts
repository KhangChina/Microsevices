import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { UtilityModule } from './utility/utility.module';
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
    autoLoadEntities: true
  }),
  UsersModule, ProductsModule, AuthenticationModule, UtilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

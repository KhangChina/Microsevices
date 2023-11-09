import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config'
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    name: process.env.DATABASE_PROVIDER_NAME,
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
  UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { UserProductModule } from 'src/user_product/user_product.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),ProductsModule,UserProductModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}

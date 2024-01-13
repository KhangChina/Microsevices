import { Module } from '@nestjs/common';
import { UserProductService } from './user_product.service';
import { UserProduct } from './entities/user_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProduct])],
  providers: [UserProductService],
  exports:[UserProductService]
})

export class UserProductModule {}

import { Injectable } from '@nestjs/common';
import { CreateUserProductDto } from './dto/create-user_product.dto';
import { UpdateUserProductDto } from './dto/update-user_product.dto';
import { UserProduct } from './entities/user_product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class UserProductService {
  @InjectRepository(UserProduct) private user_productRepository: Repository<UserProduct>
  async create(createUserProductDto: CreateUserProductDto) {
    return await this.user_productRepository.save(createUserProductDto)
  }

  findOne(id: number) {
    return `This action returns a #${id} userProduct`;
  }

  update(id: number, updateUserProductDto: UpdateUserProductDto) {
    return `This action updates a #${id} userProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProduct`;
  }
}

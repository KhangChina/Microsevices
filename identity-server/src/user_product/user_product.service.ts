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

  async findOne(user_id: string, product_id: string) {
    return await this.user_productRepository.findOne({ where: { user_id, product_id } })
  }

  async update(id: number, updateUserProductDto: UpdateUserProductDto) {
    return `This action updates a #${id} userProduct`;
  }

  async remove(user_id: string, product_id: string) {
    const data =  await this.user_productRepository.findOne({ where: { user_id, product_id } })
    return await this.user_productRepository.delete(data.ID)
  }
}

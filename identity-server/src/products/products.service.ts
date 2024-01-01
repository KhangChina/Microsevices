import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brackets, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
@Injectable()
export class ProductsService {
  @InjectRepository(Product) private productRepository: Repository<Product>
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.save(createProductDto)
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(page: number, limit: number, search: string) {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder('u')
      queryBuilder.where(new Brackets(qb => {
        qb.where("u.ID like :search", { search: `%${search}%` })
          .orWhere("u.name like :search", { search: `%${search}%` })
          .orWhere("u.note like :search", { search: `%${search}%` })
          .orWhere("u.status like :search", { search: `%${search}%` })
      }));
      queryBuilder.orderBy('u.create_at', 'DESC')
      return paginate<Product>(queryBuilder, { page, limit });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOne(ID: string) {
    try {
      return await this.productRepository.findOne({ where: { ID: ID } });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(ID: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.productRepository.update(ID, updateProductDto);
    } catch (error) {
      console.log(error)
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
 async remove(ID: string) {
    try {
      return await this.productRepository.delete(ID);
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

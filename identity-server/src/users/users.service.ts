import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  @InjectRepository(User) private userRepository: Repository<User>
  async create(createUserDto: CreateUserDto, productID: string) {
    try {
      return await this.userRepository.save({ ...createUserDto, productID: productID })
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder('u')
      queryBuilder.where(new Brackets(qb => {
        qb.where("u.ID like :search", { search: `%${search}%` })
          .orWhere("u.username like :search", { search: `%${search}%` })
          .orWhere("u.full_name like :search", { search: `%${search}%` })
          .orWhere("u.email like :search", { search: `%${search}%` })
          .orWhere("u.phone like :search", { search: `%${search}%` })
          .orWhere("u.status like :search", { search: `%${search}%` })
      }));
      queryBuilder.orderBy('u.create_at', 'DESC')
      return paginate<User>(queryBuilder, { page, limit });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(ID: number) {
    try {
      return await this.userRepository.findOne({ where: { ID: ID } })
    } catch (error) {

    }

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

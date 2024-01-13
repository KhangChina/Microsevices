import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UserStatusEnum } from 'src/decorators/userStatus.decorator';
import { Product } from 'src/products/entities/product.entity';
import { UserProduct } from 'src/user_product/entities/user_product.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User) private userRepository: Repository<User>
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto)
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async createProductForAdmin(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save({ ...createUserDto })
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
      return await this.userRepository.findOne({
        where: { ID: ID }
      })
    } catch (error) {

    } throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);

  }

  async update(ID: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(ID, updateUserDto);
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(ID: number) {
    try {
      return await this.userRepository.delete(ID);
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkUserNameAndPassword(username: string, productID: string) {
    try {
      const lstProductID = [productID]
      const status = UserStatusEnum.active
      const user = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.products", "product")
        .where("user.username = :username", { username })
        .andWhere("product.ID IN (:...lstProductID)", { lstProductID })
        .andWhere("user.status = :status", { status })
        .getOne();
      return user;
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async checkEmailAndPassword(email: string, productID: string) {
    try {
      const lstProductID = [productID]
      const status = UserStatusEnum.active
      const verified_email = true
      const user = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.products", "product")
        .where("user.email = :email", { email })
        .andWhere("product.ID IN (:...lstProductID)", { lstProductID })
        .andWhere("user.status = :status", { status })
        .andWhere("user.verified_email = :verified_email", { verified_email })
        .getOne();
      return user;
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async checkPhoneAndPassword(phone: string, productID: string) {
    try {
      const lstProductID = [productID]
      const status = UserStatusEnum.active
      const verified_phone = true
      const user = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.products", "product")
        .where("user.phone = :phone", { phone })
        .andWhere("product.ID IN (:...lstProductID)", { lstProductID })
        .andWhere("user.status = :status", { status })
        .andWhere("user.verified_phone = :verified_phone", { verified_phone })
        .getOne();
      return user;
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async checkEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email: email }
      })
    } catch (error) {

    } throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  async checkPhone(phone: string) {
    try {
      return await this.userRepository.findOne({
        where: { phone: phone }
      })
    } catch (error) {

    } throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  async getProductForUser(idUser: number) {
    try {
      const data = await this.userRepository.findOne({ where: { ID: idUser },  relations: ["userProducts","userProducts.products"] });
      return data
    }
    catch (error) {
      console.log(error)
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { ProductsService } from 'src/products/products.service';
import { JwtGuard } from 'src/guards/jwt-access.guard';
import { UserProductService } from 'src/user_product/user_product.service';
import { CreateUserProductDto } from 'src/user_product/dto/create-user_product.dto';
@ApiTags('Users')
@ApiBearerAuth()
//@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
    private readonly user_productService: UserProductService
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() request: Request) {
    //Step 1: Check data
    if (createUserDto.email) {
      const checkMail = await this.usersService.checkEmail(createUserDto.email)
      if (checkMail) {
        throw new HttpException(`${createUserDto.email} already exist !`, HttpStatus.CONFLICT);
      }
    }
    if (createUserDto.phone) {
      const checkPhone = await this.usersService.checkPhone(createUserDto.phone)
      if (checkPhone) {
        throw new HttpException(`${createUserDto.phone} already exist !`, HttpStatus.CONFLICT);
      }
    }
    //Step 3: Create hash password
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    //Step 3: Save user
    const data = await this.usersService.createProductForAdmin(createUserDto);
    return { statusCode: 201, message: 'Create user success', data };
  }

  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'per_page', required: false })
  @Get()
  async findAll(@Query() query) {
    const search: string = query.search ? query.search : ""
    const page: number = query.page > 0 ? query.page : 1
    const limit: number = query.per_page ? query.per_page : 20
    const data = await this.usersService.findAll(page, limit, search);
    return { statusCode: 200, message: 'Get data success', data };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return { statusCode: 200, message: 'Get one data success', data };
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(id, updateUserDto);
    return { statusCode: 200, message: 'Update data success', data };
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    const data = this.usersService.remove(id);
    return { statusCode: 200, message: 'Delete data success', data };
  }
  @Patch(':id/product/:idProduct')
  async updateProductForUser(@Param('id') id: string, @Param('idProduct') idProduct: string) {
    //Step 1: Get product
    const dataProduct = await this.productService.findOne(idProduct)
    if (!dataProduct) {
      throw new HttpException('Products not found!', HttpStatus.NOT_FOUND);
    }
    //Step 2: Get product user
    const dataUser = await this.usersService.findOne(id);
    if (!dataUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    //Step 3: Update product
    const createUserProduct: CreateUserProductDto = {
      products: dataProduct,
      users: dataUser
    }
    const data = await this.user_productService.create(createUserProduct)
    return { statusCode: 200, message: 'Update user - product success', data };
  }
  @Get(':id/product')
  async findAllProductByUser(@Param('id') id: string) {
    const user = await this.usersService.getProductForUser(id)
    const products = user.userProducts.map(userProduct => userProduct.products);
    if (products)
      return { statusCode: 200, message: 'Get data success', data: { "items": products } };
    throw new HttpException('Products not found!', HttpStatus.NOT_FOUND);
  }
  @Delete(':id/product/:idProduct')
  async removeUserProduct(@Param('id') id: string, @Param('idProduct') idProduct: string)
  {
    const data = await this.user_productService.remove(id, idProduct)
    return { statusCode: 200, message: 'Delete data success', data };
  }
}

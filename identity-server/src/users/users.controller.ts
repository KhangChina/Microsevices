import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { ProductsService } from 'src/products/products.service';
import { JwtGuard } from 'src/guards/jwt-access.guard';
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
  ) { }

  // @ApiHeader({
  //   name: 'client-id',
  //   description: 'Client ID',
  //   required: true
  // })

  @Post('product/:productsID')
  async create(@Body() createUserDto: CreateUserDto, @Req() request: Request,@Param('productsID') productsID: string) {
    //Step 1: Get Client ID
    const productID = productsID
    //Step 2: Check client ID
    const dataProducts = await this.productService.findOne(productID)
    if (!dataProducts) {
      return { statusCode: 404, message: 'Products not found' };
    }
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
    const data = await this.usersService.create(createUserDto, dataProducts);
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
    const data = await this.usersService.findOne(+id);
    return { statusCode: 200, message: 'Get one data success', data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(+id, updateUserDto);
    return { statusCode: 200, message: 'Update data success', data };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const data =  this.usersService.remove(+id);
    return { statusCode: 200, message: 'Delete data success', data };
  }
  
}

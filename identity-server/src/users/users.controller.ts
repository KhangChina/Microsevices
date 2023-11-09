import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { ProductsService } from 'src/products/products.service';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
  ) { }

  @ApiHeader({
    name: 'client-id',
    description: 'Client ID',
    required: true
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() request: Request) {
    //Step 1: Get Client ID
    const clientID = request.headers['client-id'];
    const productID = clientID
    //Step 2: Check client ID
    const dataProducts = await this.productService.findOne(productID)
    if (!dataProducts) {
      return { statusCode: 404, message: 'Products not found'};
    }
    //Step 3: Create hash password
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    //Step 3: Save user
    const data = await this.usersService.create(createUserDto, productID);
    return { statusCode: 201, message: 'Create products success', data };
  }
  @Get()
  async findAll(@Query() query) {
    const search: string = query.search ? query.search : ""
    const page: number = query.page > 0 ? query.page : 1
    const limit: number = query.per_page ? query.per_page : 20
    const data = await this.usersService.findAll(page, limit, search);
    return { statusCode: 201, message: 'Get data success', data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

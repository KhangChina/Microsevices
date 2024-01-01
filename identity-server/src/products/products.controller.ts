import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt-access.guard';
@ApiTags('Production')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
      const data = await this.productsService.create(createProductDto);
      return { statusCode: 201, message: 'Create products success', data };
  }

  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'per_page', required: false })
  @Get()
  async findAll(@Query() query) {
    const search: string = query.search ? query.search : ""
    const page: number = query.page > 0 ? query.page : 1
    const limit: number = query.per_page ? query.per_page : 20
    const data = await this.productsService.findAll(page, limit, search);
    return { statusCode: 200, message: 'Get data success', data: data };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(id);
    if (data)
      return { statusCode: 200, message: 'Get data success', data: data };
    return { statusCode: 404, message: 'Get data not found' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const data = await this.productsService.update(id, updateProductDto);
    return { statusCode: 200, message: 'update data success', data: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.productsService.remove(id);
    return { statusCode: 200, message: 'Delete data success', data: data };
  }
}

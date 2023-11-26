import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InformationExtendService } from './information-extend.service';
import { CreateInformationExtendDto } from './dto/create-information-extend.dto';
import { UpdateInformationExtendDto } from './dto/update-information-extend.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('Information Extend')
@Controller('information-extend')
export class InformationExtendController {
  constructor(private readonly informationExtendService: InformationExtendService) { }

  @Post()
  async create(@Body() createInformationExtendDto: CreateInformationExtendDto) {
    const data = await this.informationExtendService.create(createInformationExtendDto);
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
    const data = await this.informationExtendService.findAll(page, limit, search);
    return { statusCode: 200, message: 'Get data success', data: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.informationExtendService.findOne(id);
    if (data)
      return { statusCode: 200, message: 'Get data success', data: data };
    return { statusCode: 404, message: 'Get data not found' };
  }

  @Get('patient/:IDPatient')
  async findOneByPatient(@Param('IDPatient') IDPatient: string) {
    const data = await this.informationExtendService.findOneByIDPatient(IDPatient);
    if (data)
      return { statusCode: 200, message: 'Get data success', data: data };
    return { statusCode: 404, message: 'Get data not found' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInformationExtendDto: UpdateInformationExtendDto) {
    const data = await this.informationExtendService.update(id, updateInformationExtendDto);
    return { statusCode: 200, message: 'update data success', data: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.informationExtendService.remove(+id);
    return { statusCode: 200, message: 'Delete data success', data: data }; 
  }

}

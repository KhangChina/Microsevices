import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformationExtendService } from './information-extend.service';
import { CreateInformationExtendDto } from './dto/create-information-extend.dto';
import { UpdateInformationExtendDto } from './dto/update-information-extend.dto';

@Controller('information-extend')
export class InformationExtendController {
  constructor(private readonly informationExtendService: InformationExtendService) {}

  @Post()
  create(@Body() createInformationExtendDto: CreateInformationExtendDto) {
    return this.informationExtendService.create(createInformationExtendDto);
  }

  @Get()
  findAll() {
    return this.informationExtendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informationExtendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformationExtendDto: UpdateInformationExtendDto) {
    return this.informationExtendService.update(+id, updateInformationExtendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informationExtendService.remove(+id);
  }
}

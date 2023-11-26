import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformationEnterpriseService } from './information-enterprise.service';
import { CreateInformationEnterpriseDto } from './dto/create-information-enterprise.dto';
import { UpdateInformationEnterpriseDto } from './dto/update-information-enterprise.dto';

@Controller('information-enterprise')
export class InformationEnterpriseController {
  constructor(private readonly informationEnterpriseService: InformationEnterpriseService) {}

  @Post()
  create(@Body() createInformationEnterpriseDto: CreateInformationEnterpriseDto) {
    return this.informationEnterpriseService.create(createInformationEnterpriseDto);
  }

  @Get()
  findAll() {
    return this.informationEnterpriseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informationEnterpriseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformationEnterpriseDto: UpdateInformationEnterpriseDto) {
    return this.informationEnterpriseService.update(+id, updateInformationEnterpriseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informationEnterpriseService.remove(+id);
  }
}

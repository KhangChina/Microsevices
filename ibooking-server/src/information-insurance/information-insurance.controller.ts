import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformationInsuranceService } from './information-insurance.service';
import { CreateInformationInsuranceDto } from './dto/create-information-insurance.dto';
import { UpdateInformationInsuranceDto } from './dto/update-information-insurance.dto';

@Controller('information-insurance')
export class InformationInsuranceController {
  constructor(private readonly informationInsuranceService: InformationInsuranceService) {}

  @Post()
  create(@Body() createInformationInsuranceDto: CreateInformationInsuranceDto) {
    return this.informationInsuranceService.create(createInformationInsuranceDto);
  }

  @Get()
  findAll() {
    return this.informationInsuranceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informationInsuranceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformationInsuranceDto: UpdateInformationInsuranceDto) {
    return this.informationInsuranceService.update(+id, updateInformationInsuranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informationInsuranceService.remove(+id);
  }
}

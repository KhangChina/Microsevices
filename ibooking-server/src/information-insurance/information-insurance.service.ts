import { Injectable } from '@nestjs/common';
import { CreateInformationInsuranceDto } from './dto/create-information-insurance.dto';
import { UpdateInformationInsuranceDto } from './dto/update-information-insurance.dto';

@Injectable()
export class InformationInsuranceService {
  create(createInformationInsuranceDto: CreateInformationInsuranceDto) {
    return 'This action adds a new informationInsurance';
  }

  findAll() {
    return `This action returns all informationInsurance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informationInsurance`;
  }

  update(id: number, updateInformationInsuranceDto: UpdateInformationInsuranceDto) {
    return `This action updates a #${id} informationInsurance`;
  }

  remove(id: number) {
    return `This action removes a #${id} informationInsurance`;
  }
}

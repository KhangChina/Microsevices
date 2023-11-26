import { Injectable } from '@nestjs/common';
import { CreateInformationEnterpriseDto } from './dto/create-information-enterprise.dto';
import { UpdateInformationEnterpriseDto } from './dto/update-information-enterprise.dto';

@Injectable()
export class InformationEnterpriseService {
  create(createInformationEnterpriseDto: CreateInformationEnterpriseDto) {
    return 'This action adds a new informationEnterprise';
  }

  findAll() {
    return `This action returns all informationEnterprise`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informationEnterprise`;
  }

  update(id: number, updateInformationEnterpriseDto: UpdateInformationEnterpriseDto) {
    return `This action updates a #${id} informationEnterprise`;
  }

  remove(id: number) {
    return `This action removes a #${id} informationEnterprise`;
  }
}

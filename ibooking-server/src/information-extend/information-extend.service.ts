import { Injectable } from '@nestjs/common';
import { CreateInformationExtendDto } from './dto/create-information-extend.dto';
import { UpdateInformationExtendDto } from './dto/update-information-extend.dto';

@Injectable()
export class InformationExtendService {
  create(createInformationExtendDto: CreateInformationExtendDto) {
    return 'This action adds a new informationExtend';
  }

  findAll() {
    return `This action returns all informationExtend`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informationExtend`;
  }

  update(id: number, updateInformationExtendDto: UpdateInformationExtendDto) {
    return `This action updates a #${id} informationExtend`;
  }

  remove(id: number) {
    return `This action removes a #${id} informationExtend`;
  }
}

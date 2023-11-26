import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInformationExtendDto } from './dto/create-information-extend.dto';
import { UpdateInformationExtendDto } from './dto/update-information-extend.dto';
import { InformationExtend } from './entities/information-extend.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InformationExtendService {
  @InjectRepository(InformationExtend) private informationExtendRepository: Repository<InformationExtend>
  async create(createInformationExtendDto: CreateInformationExtendDto) {
    try {
      return await this.informationExtendRepository.save(createInformationExtendDto)
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(page: number, limit: number, search: string) {
    return `This action returns all informationExtend`;
  }

  async findOne(ID: string) {
    try {
      return await this.informationExtendRepository.findOne({ where: { ID: ID } });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByIDPatient(IDPatient: string)
  {
    try {
      return await this.informationExtendRepository.findOne({ where: { IDPatient: IDPatient } });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(ID: string, updateInformationExtendDto: UpdateInformationExtendDto) {
    try {
      return await this.informationExtendRepository.update(ID, updateInformationExtendDto);
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} informationExtend`;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { Otp } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { OtpTypeEnum } from 'src/decorators/otp-type.decorator';

@Injectable()
export class OtpService {
  @InjectRepository(Otp) private otpRepository: Repository<Otp>
  async create(createOtpDto: CreateOtpDto) {
    return await this.otpRepository.save(createOtpDto);
  }

  findAll() {
    return `This action returns all otp`;
  }

  async findOneBlock(value: string, type: OtpTypeEnum, count : number) {
    try {
      return await this.otpRepository.findOne({ where: { value: value, type: type ,count } });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findOne(value: string, type: OtpTypeEnum) {
    try {
      return await this.otpRepository.findOne({ where: { value: value, type: type } });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(value: string, updateOtpDto: any) {
    try {
      return await this.otpRepository.update({ value: value }, updateOtpDto)
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyOTP(id: number, type: OtpTypeEnum, code: string) {
    try {
      //Thời gian sống của code = 2 phút
      const now = Date.now()
      const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);
      //Tìm kiếm OTP
      return await this.otpRepository.findOne({ where: { ID: id, code: code, type: type,create_at: MoreThanOrEqual(fiveMinutesAgo) } });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOneVerifyOTP(value: string, type: OtpTypeEnum)
  {
    try {
      return await this.otpRepository.findOne({ where: { value: value, type: type , verify: true} });
    } catch (error) {
      throw new HttpException('Server Problem !', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

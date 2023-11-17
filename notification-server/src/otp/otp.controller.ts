import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InputOtpDto } from './dto/input-otp.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { OtpTypeEnum } from 'src/decorators/otp-type.decorator';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { count } from 'console';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailService: MailService
  ) { }

  @Post()
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return this.otpService.findOne(+id);
  }

  @Post('mail')
  async sendOTPMail(@Body() otpInput: InputOtpDto) {
    //Step 1: Check sended mail
    let mail_ex = await this.otpService.findOneBlock(otpInput.value, OtpTypeEnum.register, 5)
    if (mail_ex) {
      throw new HttpException(`Block email ${mail_ex.value} !`, HttpStatus.BAD_REQUEST);
    }
    //Step 2: Check mail verify
    mail_ex = await this.otpService.findOneVerifyOTP(otpInput.value, OtpTypeEnum.register)
    if(mail_ex)
    {
      throw new HttpException(`Email ${mail_ex.value} verified !`, HttpStatus.BAD_REQUEST);
    }
    //Step 3: Check send
    let count = 0
    mail_ex = await this.otpService.findOne(otpInput.value, OtpTypeEnum.register)
    if (mail_ex) {
      count = mail_ex.count++
    }
    //Step 2: Check email validate
    let numCode = 6
    if (otpInput.numCode) {
      numCode = otpInput.numCode
    }

    const code_send = this.generateOTP(numCode);
    const check = await this.mailService.sendOTPEmail('OTP Verify', './otp', otpInput.value, code_send);
    if (!check) {
      throw new HttpException(`${otpInput.value} malformed or non-existent email`, HttpStatus.BAD_REQUEST);
    }
    //Step 3: Create OTP for DB
    const create_opt: CreateOtpDto = {
      value: otpInput.value,
      type: OtpTypeEnum.register,
      code: code_send,
      count: count
    }
    //Step 4: Create data for OTP
    const data_create = await this.otpService.create(create_opt)
    const data = {
      ID: data_create.ID,
      value: data_create.value
    }
    return { statusCode: 201, message: 'Send mail success', data };
  }

  @Post('verify/:id')
  async verifyOTP(@Param('id') id: number, @Body() verifyOtpDto: VerifyOtpDto) {
    const data = await this.otpService.verifyOTP(id, verifyOtpDto.type, verifyOtpDto.code)
    if (!data) {
      throw new HttpException(`OTP not found !`, HttpStatus.NOT_FOUND);
    }
    await this.otpService.update(data.value, { verify: true })
    return { statusCode: 201, message: `OTP for ${data.value} success` };
  }

  generateOTP(length) {
    const max = Math.pow(10, length);
    const otp = Math.floor(Math.random() * max);
    return otp.toString().padStart(length, '0');
  }

  @MessagePattern('check_otp')
  checkOTP(data : any)
  {
      console.log(data)
      return true
  }
}

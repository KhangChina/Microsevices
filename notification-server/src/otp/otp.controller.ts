import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { InputOtpDto } from './dto/input-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

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
    return this.otpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }
  @Post('mail')
  sendOTPMail(@Body() otpInput: InputOtpDto)
  {
    
    //Check
    let numCode = 6
    if(otpInput.numCode)
    {
      numCode
    }
    const code = Math.floor(Math.random() * 1000000000);
    const code_send = code.toString().padStart(otpInput.numCode, '0');
    // const check = await this.mailService.sendOTPEmail(createOtpDto.value, code);
    // if (!check) {
    //   throw new HttpException(`${createOtpDto.value} malformed or non-existent email`, HttpStatus.BAD_REQUEST);
    // }
    // return {otpInput}
  }
}

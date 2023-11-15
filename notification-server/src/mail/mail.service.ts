import { Injectable } from '@nestjs/common';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }
  async sendOTPEmail(subject: string, template: string, email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: subject,
        template: './otp',
        context: {
          code,
          email
        },
      });
      return true
    } catch (error) {
      return false
    }
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}

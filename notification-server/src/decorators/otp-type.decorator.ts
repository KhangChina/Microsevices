import { SetMetadata } from '@nestjs/common';
export enum OtpTypeEnum {
  register = 'register', 
  forgot = 'forgot',
  verify = 'verify'
}
export const Roles = (...otpTypes: OtpTypeEnum[]) => SetMetadata('OtpTypes', otpTypes);

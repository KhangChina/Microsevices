import { SetMetadata } from '@nestjs/common';
export enum SendTypeEnum {
  mail = 'mail', 
  phone = 'phone',
  call = 'call',
  telegram='telegram',
  zalo='zalo',
  messenger='messenger',
  sms='sms'
}
export const Roles = (...sendTypes: SendTypeEnum[]) => SetMetadata('SendTypes', sendTypes);

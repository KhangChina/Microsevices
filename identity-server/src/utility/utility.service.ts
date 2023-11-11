import { Injectable } from '@nestjs/common';
@Injectable()
export class UtilityService {

  checkString(str) {
    // Kiểm tra số điện thoại
    const phoneRegex = /^(\+\d{1,3})?(\d{10,11})$/;
    if (phoneRegex.test(str)) {
      return {
        type: 'phone',
        data: str
      };
    }
    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(str)) {
      return {
        type: 'email',
        data: str
      };
    }
    
    return {
      type: 'username',
      data: str
    };
  }

}

import { OtpTypeEnum } from "src/decorators/otp-type.decorator";

export class CreateOtpDto {
    value: string;
    type: OtpTypeEnum;
    code: string;
    count: number;
}

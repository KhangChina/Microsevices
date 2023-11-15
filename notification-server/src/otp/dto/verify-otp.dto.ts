import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { OtpTypeEnum } from "src/decorators/otp-type.decorator";

export class VerifyOtpDto {
    @ApiProperty({ type: String, example: "830815232" })
    @IsNotEmpty()
    @IsString()
    @MaxLength(9)
    @MinLength(3)
    code: string;

    @ApiProperty({ enum: OtpTypeEnum })
    @IsEnum(OtpTypeEnum, { each: true })
    @IsNotEmpty()
    type: OtpTypeEnum;
}

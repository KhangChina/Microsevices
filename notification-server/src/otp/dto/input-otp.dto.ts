import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString,IsNumber, IsEnum, IsOptional, MAX, MaxLength, MinLength, Min, Max, IsEmail } from "class-validator";
import { SendTypeEnum } from "src/decorators/send-type.decorator";


export class InputOtpDto {

    @ApiProperty({ type: String, example: "khang.nguyen@htgsoft.com" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    value: string;

    @ApiProperty({ type: Number ,example: 6})
    @IsNotEmpty()
    @IsNumber()
    @Min(3)
    @Max(9)
    numCode: number;
}

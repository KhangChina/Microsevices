import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString,IsNumber, IsEnum, IsOptional } from "class-validator";
import { SendTypeEnum } from "src/decorators/send-type.decorator";


export class InputOtpDto {

    @IsEnum(SendTypeEnum, { each: true })
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ enum: SendTypeEnum })
    type: SendTypeEnum;

    @ApiProperty({ type: String, example: "khang.nguyen@htgsoft.com or +84964440776" })
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty({ type: Number ,example: 6})
    @IsNotEmpty()
    @IsNumber()
    numCode: number;
}

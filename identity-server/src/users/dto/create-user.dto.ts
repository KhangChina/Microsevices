import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { UserStatusEnum } from "src/decorators/userStatus.decorator";

export class CreateUserDto {

    @ApiProperty({ type: String, example: "HelloKitty123@" })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password: string;

    @ApiProperty({ type: String, example: "khang.nguyen" })
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty({ type: String, example: "Khang Nguyễn" })
    @IsOptional()
    @IsString()
    full_name: string;

    @ApiProperty({ type: String, example: "khang.nguyen@htgsoft.com" })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({ type: String, example: "+84964440775"})
    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ type: Boolean, example: false})
    @IsOptional()
    @IsBoolean()
    verified_phone: boolean

    @ApiProperty({ type: Boolean, example: false})
    @IsOptional()
    @IsBoolean()
    verified_email: boolean
}


import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ type: String, example: "HelloKitty123@" })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password: string;

    @ApiProperty({ type: String, example: "khang.nguyen" })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ type: String, example: "Khang Nguyễn" })
    @IsNotEmpty()
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

}

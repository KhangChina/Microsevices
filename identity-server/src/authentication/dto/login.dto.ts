import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {

    @ApiProperty({ type: String, example: "58aaae56-9976-4815-86bc-60734133f048" })
    @IsNotEmpty()
    @IsString()
    productID: string;

    @ApiProperty({ type: String, example: "khang.nguyen" })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ type: String, example: "HelloKitty123@" })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password: string;

}

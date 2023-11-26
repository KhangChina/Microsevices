import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateInformationExtendDto {

    @ApiProperty({ type: String, example: "PA00-1" })
    @IsNotEmpty()
    @IsString()
    IDPatient: string;

    @ApiProperty({ type: String, example: "0964440775" })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ type: String, example: "example@gmail.com" })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ type: String, example: "Note is here" })
    @IsNotEmpty()
    @IsString()
    note: string;

}

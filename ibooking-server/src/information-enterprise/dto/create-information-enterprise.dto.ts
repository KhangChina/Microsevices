import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInformationEnterpriseDto {

    @ApiProperty({ type: String, example: "skhdflha87345" })
    @IsNotEmpty()
    @IsString()
    IDInformationExtend: string;

    @ApiProperty({ type: String, example: "1003458598699" })
    @IsNotEmpty()
    @IsString()
    taxCode: string;

    @ApiProperty({ type: String, example: "Công ty CP CNTT ABC SOFT" })
    @IsNotEmpty()
    @IsString()
    nameEnterprise: string;

    @ApiProperty({ type: String, example: "128 Đường D2, P.07, Q. Tân Bình, HCM, Việt Nam" })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty()
    @IsOptional()
    locationMapping: any

}

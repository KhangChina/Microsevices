import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateLocationDto {

    @ApiProperty({ example: "Địa chỉ nhà", description: 'describe' })
    @IsOptional()
    describe: string

    @ApiProperty({ example: "Số 3 đường 398", description: 'address' })
    @IsOptional()
    address: string

    @ApiProperty({ example: 1, description: 'province ID' })
    @IsNotEmpty()
    provinceID: number

    @ApiProperty({ example: 1, description: 'district ID' })
    @IsNotEmpty()
    districtID: number

    @ApiProperty({ example: 1, description: 'commune ID' })
    @IsNotEmpty()
    communeID: number

}

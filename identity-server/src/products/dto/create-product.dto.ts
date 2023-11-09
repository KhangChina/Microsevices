import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ProductStatusEnum } from "src/decorators/productStatus.decorator";

export class CreateProductDto {
    
    @ApiProperty({ type: String, example: "Product ABC" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String, example: "Product for HRM" })
    @IsNotEmpty()
    @IsString()
    note: string;
  
    @IsEnum(ProductStatusEnum, { each: true })
    @IsOptional()
    @ApiProperty({ enum: ProductStatusEnum })
    status: ProductStatusEnum
    
}

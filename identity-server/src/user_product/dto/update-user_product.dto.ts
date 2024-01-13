import { PartialType } from '@nestjs/swagger';
import { CreateUserProductDto } from './create-user_product.dto';

export class UpdateUserProductDto extends PartialType(CreateUserProductDto) {}

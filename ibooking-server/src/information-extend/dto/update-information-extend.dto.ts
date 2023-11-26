import { PartialType } from '@nestjs/swagger';
import { CreateInformationExtendDto } from './create-information-extend.dto';

export class UpdateInformationExtendDto extends PartialType(CreateInformationExtendDto) {}

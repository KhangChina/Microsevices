import { PartialType } from '@nestjs/swagger';
import { CreateInformationEnterpriseDto } from './create-information-enterprise.dto';

export class UpdateInformationEnterpriseDto extends PartialType(CreateInformationEnterpriseDto) {}

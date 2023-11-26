import { PartialType } from '@nestjs/swagger';
import { CreateInformationInsuranceDto } from './create-information-insurance.dto';

export class UpdateInformationInsuranceDto extends PartialType(CreateInformationInsuranceDto) {}

import { Module } from '@nestjs/common';
import { InformationInsuranceService } from './information-insurance.service';
import { InformationInsuranceController } from './information-insurance.controller';

@Module({
  controllers: [InformationInsuranceController],
  providers: [InformationInsuranceService],
})
export class InformationInsuranceModule {}

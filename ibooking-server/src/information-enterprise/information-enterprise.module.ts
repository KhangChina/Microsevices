import { Module } from '@nestjs/common';
import { InformationEnterpriseService } from './information-enterprise.service';
import { InformationEnterpriseController } from './information-enterprise.controller';

@Module({
  controllers: [InformationEnterpriseController],
  providers: [InformationEnterpriseService],
})
export class InformationEnterpriseModule {}

import { Module } from '@nestjs/common';
import { InformationExtendService } from './information-extend.service';
import { InformationExtendController } from './information-extend.controller';

@Module({
  controllers: [InformationExtendController],
  providers: [InformationExtendService],
})
export class InformationExtendModule {}

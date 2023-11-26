import { Module } from '@nestjs/common';
import { InformationExtendService } from './information-extend.service';
import { InformationExtendController } from './information-extend.controller';
import { InformationExtend } from './entities/information-extend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InformationExtend])],
  controllers: [InformationExtendController],
  providers: [InformationExtendService],
})
export class InformationExtendModule {}

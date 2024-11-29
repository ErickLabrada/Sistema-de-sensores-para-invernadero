import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/domain/section.entity';
import { Threshold } from 'src/domain/threshold.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Section,Threshold])],
  controllers: [SectionController],
  providers: [SectionService]
})
export class SectionModule {}
